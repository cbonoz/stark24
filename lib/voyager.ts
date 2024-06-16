import axios from 'axios'

const baseURL = 'https://sepolia-api.voyager.online/beta' // from telegram

// https://docs.voyager.online/
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// https://docs.voyager.online/#get-/txns
export const getTransactions = (address: string, p?: number) => {
    return axiosInstance.get(`/txns?to=${address}&p=${p || 1}`)
}

// https://docs.voyager.online/#get-/contracts/-contractAddress-
export const getContract = (contractAddress: string) => {
    return axiosInstance.get(`/contracts/${contractAddress}`)
}
