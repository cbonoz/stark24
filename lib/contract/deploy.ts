import { PAGE_CONTRACT_SIERRA } from './sierra'
import { formatDate } from '../utils'
import { ethers } from 'ethers'
import {
    Account,
    CairoAssembly,
    Contract,
    ec,
    Signer,
    RpcProvider,
    CallData,
    stark,
} from 'starknet'
import { PAGE_CONTRACT_CASM } from './casm'
import { PageItem } from '../types'

const PROVIDER_SEPOLIA = new RpcProvider({
    nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
})

export async function deployContract(
    account: any,
    ownerAddress: string,
    title: string,
    description: string,
    itemString: string
) {
    // Declare & deploy contract
    // https://github.com/ArnaudBD/starknet-counter-workshop/blob/8b3759fa338a36416a793074d7c5f875e8f7bb9c/target/dev/counter_Counter.contract_class.json
    const sierraCode = PAGE_CONTRACT_SIERRA
    const casmCode = PAGE_CONTRACT_CASM
    const myCallData = new CallData(sierraCode.abi)
    const constructor = myCallData.compile('constructor', {
        title: 100,
        description,
        owner: ownerAddress,
        items: itemString,
    })

    console.log('Deploying contract...', title, sierraCode, casmCode)
    const deployResponse = await account.declareAndDeploy({
        contract: sierraCode,
        casm: casmCode,
        constructorCalldata: constructor,
        salt: stark.randomAddress(),
    })

    // const signer = new Signer(await wallet.connector.getSigner())
    // const address = wallet.address

    // const account = new Account(PROVIDER_SEPOLIA, address, signer)

    // Deploy contract with starknetjs using dynamic.xyz provider.
    // const contract = JSON.stringify(PAGE_CONTRACT_SIERRA)
    // const casm = PAGE_CONTRACT_CASM as any

    // // https://www.starknetjs.com/docs/guides/create_contract/#declareanddeploy-your-new-contract
    // const deployResponse = await account.declareAndDeploy({
    //     contract,
    //     casm,
    // })

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
