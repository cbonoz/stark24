export interface PageItem {
    id?: string
    name?: string
    description?: string
    link?: string
    price?: string
}

export interface PageData {
    owner: string
    name: string
    description: string
    items: PageItem[]
    createdAt?: string
}

/*
{
"blockNumber": 31161,
"hash": "0x58a09c20584d106c919108aa0f74100208a965f5578c91e154d955ee2fb6b88",
"index": 33,
"l1VerificationHash": "null",
"type": "INVOKE",
"classHash": "null",
"contractAddress": "0x075393af6a0e08633b994dc741277e6668a2509ac6ccb9abce209eb4f81f84aa",
"timestamp": 1680541790,
"actualFee": "515658095864308",
"actions": "approve,approve,addLiquidity",
"contractAlias": "ArgentProxy",
"classAlias": "null",
"status": "Accepted on L2"
}
*/
export interface VoyagerTransaction {
    blockNumber: number
    hash: string
    index: number
    l1VerificationHash: string
    type: string
    classHash: string
    contractAddress: string
    timestamp: number
    actualFee: string
    actions: string
    contractAlias: string
    classAlias: string
    status: string
}
