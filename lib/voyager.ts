import axios from 'axios'
import { VOYAGE_KEY } from './constants'

const baseURL = 'https://sepolia-api.voyager.online/beta' // from telegram

// https://docs.voyager.online/
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': VOYAGE_KEY,
    },
})

// https://docs.voyager.online/#get-/txns
export const getTransactionsFromVoyager = (address: string, p?: number) => {
    return axiosInstance.get(`/txns?to=${address}&p=${p || 1}`)
}

// https://docs.voyager.online/#get-/contracts/-contractAddress-
export const getContractFromVoyager = (contractAddress: string) => {
    return axiosInstance.get(`/contracts/${contractAddress}`)
}
