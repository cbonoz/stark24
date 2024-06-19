import { PAGE_CONTRACT_SIERRA } from './sierra'
import { formatDate } from '../utils'
import { ethers } from 'ethers'
import {
    Account,
    CairoAssembly,
    Contract,
    ec,
    Provider,
    Signer,
    RpcProvider,
} from 'starknet'
import { PAGE_CONTRACT_CASM } from './casm'

function bin2String(array: any[]) {
    return String.fromCharCode.apply(String, array)
}

// https://viem.sh/docs/contract/deployContract.html

export async function deployContract(wallet: any, title: string) {
    const providerSepoliaTestnetNethermindPublic = new RpcProvider({
        nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
    })
    const provider = providerSepoliaTestnetNethermindPublic // await wallet.connector.getRpc()
    const signer = new Signer(await wallet.connector.getSigner())
    const address = wallet.address

    const account = new Account(provider, address, signer)

    // Deploy contract with starknetjs using dynamic.xyz provider.
    const contract = JSON.stringify(PAGE_CONTRACT_SIERRA)
    const casm = PAGE_CONTRACT_CASM as any
    console.log('Deploying contract...', title, contract, casm)

    // https://www.starknetjs.com/docs/guides/create_contract/#declareanddeploy-your-new-contract
    const deployResponse = await account.declareAndDeploy({
        contract,
        casm,
    })

    const classHash = deployResponse.declare.class_hash
    const contractAddress = deployResponse.deploy.contract_address
    console.log('Deployed contract...', title, classHash, contractAddress)
    return contractAddress
}

export const getMetadata = async (signer: any, address: string) => {
    const contract = new ethers.Contract(address, PAGE_CONTRACT.abi, signer)
    const result = await (contract.getMetadata as any).call()
    console.log('result', result)
    return {
        name: result[0],
        description: result[1],
        versionCount: result[2].toNumber(),
        createdAt: formatDate(result[3].toNumber() * 1000),
        owner: result[4],
    }
}

export const validate = async (
    signer: any,
    address: string,
    signature: string
) => {
    const contract = new ethers.Contract(address, PAGE_CONTRACT.abi, signer)
    const result = await contract.validate(signature)
    console.log('result', result)
    return {
        creator: result[0],
        dataHash: result[1],
        timestamp: formatDate(result[2].toNumber() * 1000),
        version: result[3].toNumber(),
        cid: result[4],
        notes: result[5],
    }
}
