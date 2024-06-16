export interface PageItem {
    name: string
    description: string
    link: string
    price: string
}

export interface PageData {
    name: string
    description: string
    items: PageItem[]
}

export interface ContractMetadata {
    owner: string
    createdAt: number
    name: string
    description: string
    network: string
}
