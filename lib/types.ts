export interface RequestData {
    recipientName: string
    recipientAddress: string
    balance: number
    name: string
    description: string
    files: string[]
}

export interface ContractMetadata {
    owner: string
    createdAt: number
    name: string
    description: string
    balance: number
    recipientName: string
    recipientAddress: string
    cid?: string // optional cid pointer to attachment/s
    validatedAt: number
    signature: string
    network: string
}

export interface SchemaItem {
    name: string
    type: string
}

export interface SchemaEntry {
    name: string
    request: string
    timestamp: string
    signature: string
}
