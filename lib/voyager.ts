import axios from 'axios'

const baseURL = 'https://sepolia-api.voyager.online/beta' // from telegram
const API_KEY = process.env.NEXT_PUBLIC_VOYAGER_API_KEY

// https://docs.voyager.online/
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
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
