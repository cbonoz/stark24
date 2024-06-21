'use client'

import { VoyagerTransaction } from '@/lib/types'
import { isEmpty } from '@/lib/utils'
import {
    getContractFromVoyager,
    getTransactionsFromVoyager,
} from '@/lib/voyager'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Button } from './ui/button'

interface Props {
    pageId: string
}

const ViewReceipts = ({ pageId }: Props) => {
    const [transactions, setTransactions] = useState<VoyagerTransaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [contractInformation, setContractInformation] = useState<any>(null)
    const [page, setPage] = useState(1)

    async function getContractInformation() {
        try {
            const res = await getContractFromVoyager(pageId)
            const { data } = res

            setContractInformation(data)
        } catch (error) {
            console.error('error fetching contract information', error)
            setError(
                'Failed to fetch contract information, check console for more information. Make sure the url is a valid or active ZkPage address.'
            )
        }
    }

    async function getTransactions() {
        setLoading(true)
        setError(null)

        try {
            const res = await getTransactionsFromVoyager(pageId, page)
            const { data } = res

            setTransactions(data.items)
        } catch (error) {
            console.error('error fetching transactions', error)
            setError(
                'Failed to fetch transactions, check console for more information. Make sure the url is a valid or active ZkPage address.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [pageId])

    const hasTransactions = !isEmpty(transactions) && !loading
    const noTransactions = isEmpty(transactions) && !loading

    return (
        <div className="min-w-[800px]">
            <div className="text-2xl font-bold text-gray-800">
                View Receipts
            </div>

            {noTransactions && !error && (
                <div className="text-gray-500">No transactions found</div>
            )}

            {transactions.map((txn, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                    <div className="flex items-center">
                        <div className="text-gray-500">{txn.timestamp}</div>
                        <div className="text-gray-500 ml-4">{txn.hash}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500">{txn.type}</div>
                        <div className="text-gray-500 ml-4">
                            {txn.actualFee}
                        </div>
                    </div>
                </div>
            ))}

            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {error && <div className="text-red-500">{error}</div>}

            {/* Pulled from voyager link */}
        </div>
    )
}

export default ViewReceipts
