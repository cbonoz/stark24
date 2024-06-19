import { PAGE_CONTRACT_SIERRA } from './sierra'
import { RpcProvider, CallData, stark } from 'starknet'
import { PAGE_CONTRACT_CASM } from './casm'

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
        title,
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
