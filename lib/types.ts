export interface PageItem {
    id?: string
    name: string
    description: string
    link: string
    price: string
}

export interface PageData {
    owner: string
    name: string
    description: string
    items: PageItem[]
    createdAt?: string
}

export interface ContractMetadata {
    owner: string
    createdAt: number
    name: string
    description: string
    network: string
}
