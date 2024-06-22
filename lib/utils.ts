import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Chain } from 'viem'
import { PageData } from './types'
import { SEPOLIA } from './constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isEmpty = (obj: any) => !obj || obj.length === 0

export const getAttestationUrl = (attestationId: string) => {
    return `https://scan.sign.global/attestation/${attestationId}`
}

export const abbreviate = (s: string | undefined, chars?: number) =>
    s ? `${s.substr(0, chars || 6)}**` : ''

export const assertTrue = (condition: boolean, message: string) => {
    if (!condition) {
        throw new Error(message)
    }
}

export const formatCurrency = (amount: number, chain?: Chain) => {
    if (!chain) {
        return `${amount} ETH`
    }
    // decimals
    const decimals = chain.nativeCurrency.decimals
    const symbol = chain.nativeCurrency.symbol
    return `${amount / 10 ** decimals} ${symbol}`
}

export function feltToStr(felt: bigint): string {
    return Buffer.from(felt.toString(16), 'hex').toString()
}

export function feltArrToStr(felts: bigint[]): string {
    return felts.reduce((memo, felt) => memo + feltToStr(felt), '')
}

export const getExplorerUrl = (address?: string, isTx?: boolean) => {
    const prefix = isTx ? 'tx' : 'contract'
    const baseUrl = SEPOLIA.explorers.starkscan[0]
    if (!baseUrl || !address) {
        return ''
    }
    return `${baseUrl}/${prefix}/${address}`
}

function parseJson(inputString: string) {
    // Check if the string starts with '{'
    if (inputString.startsWith('{')) {
        const lastIndex = inputString.lastIndexOf('}')
        if (lastIndex !== -1) {
            inputString = inputString.slice(0, lastIndex + 1)
        }
    }
    // Check if the string starts with '['
    if (inputString.startsWith('[')) {
        const lastIndex = inputString.lastIndexOf(']')
        if (lastIndex !== -1) {
            inputString = inputString.slice(0, lastIndex + 1)
        }
    }
    // If the string doesn't start with '{' or '[', return it unchanged
    return JSON.parse(inputString)
}

export const strip0x = (s: string) => (s.startsWith('0x') ? s.slice(2) : s)

export const add0x = (s: string) => (s.startsWith('0x') ? s : `0x${s}`)

export const transformMetadata = (contractData: any): PageData => {
    // This is where we can transform the contract data to a more usable format,
    const name = feltToStr(contractData[0])
    const description = feltArrToStr(contractData[1].data)
    const owner = feltArrToStr(contractData[2].data)
    const itemString = feltArrToStr(contractData[3].data)
    const items = parseJson(itemString)

    const data = {
        name,
        description,
        owner: add0x(owner),
        items,
    }
    console.log('transformMetadata', data)
    return data
}

export const formatDate = (
    d: Date | string | number | undefined,
    onlyDate?: boolean
) => {
    if (!(d instanceof Date)) {
        d = d ? new Date(d) : new Date()
    }

    if (onlyDate) {
        return d.toLocaleDateString()
    }
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const isValidEmail = (email: string) => {
    return email && email.indexOf('@') !== -1
}

export const getNameFromUser = (user: any) => {
    return `${user.firstName} ${user.lastName}`
}

export const storeUrl = (address: string) =>
    `${window.location.origin}/pid/${address}`

export const termsUrl = () => `${window.location.origin}/terms`

export const convertCamelToHuman = (str: string) => {
    // Check if likely datetime timestamp ms
    if (str.length === 13) {
        // Check if parseable as a date
        const date = new Date(parseInt(str))
        if (!isNaN(date.getTime())) {
            return formatDate(date)
        }
    }

    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (s) {
            return s.toUpperCase()
        })
        .replace(/_/g, ' ')
}

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getIpfsUrl = (cid: string) => {
    return `https://gateway.lighthouse.storage/ipfs/${cid}`
}
