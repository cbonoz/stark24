import { PAGE_CONTRACT_SIERRA } from './sierra'
import { RpcProvider, CallData, stark, Contract } from 'starknet'
import { PAGE_CONTRACT_CASM } from './casm'
import { strip0x } from '../utils'

const PROVIDER_SEPOLIA = new RpcProvider({
    nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
})

function createByteArray(itemString: string) {
    const itemBytes = itemString // new TextEncoder().encode(itemString)
    // split itemstring into 31 byte chunks
    const pieces = []
    for (let i = 0; i < itemBytes.length; i += 31) {
        pieces.push(itemBytes.slice(i, i + 31))
    }

    const byteArray = {
        pending_word_len: itemBytes.length,
        pending_word: itemBytes.length % 31,
        data: pieces,
    }

    return byteArray
}

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
    const args = {
        page_name: title,
        description: createByteArray(description),
        owner: createByteArray(strip0x(ownerAddress)),
        items: createByteArray(itemString),
    }
    // const args = [title, description, ownerAddress, itemString]
    const constructor = myCallData.compile('constructor', args)

    console.log('Deploying contract...', args)
    const deployResponse = await account.declareAndDeploy({
        contract: sierraCode,
        casm: casmCode,
        constructorCalldata: constructor,
        salt: stark.randomAddress(),
    })

    // Connect the new contract instance :
    const myTestContract = new Contract(
        sierraCode.abi,
        deployResponse.deploy.contract_address,
        PROVIDER_SEPOLIA
    )
    console.log(
        `✅ Contract has been deploy with the address: ${myTestContract.address}`
    )

    const classHash = deployResponse.declare.class_hash
    const contractAddress = deployResponse.deploy.contract_address
    console.log(
        'Deployed contract...',
        title,
        classHash,
        contractAddress,
        myTestContract.address
    )
    return myTestContract.address
}
