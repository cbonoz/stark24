'use client'

import { VoyagerTransaction } from '@/lib/types'
import { abbreviate, formatDate, getExplorerUrl, isEmpty } from '@/lib/utils'
import {
    getContractFromVoyager,
    getTransactionsFromVoyager,
} from '@/lib/voyager'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Button } from './ui/button'
import RenderObject from './render-object'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from './ui/input'

interface Props {
    pageId: string
}

const ViewReceipts = ({ pageId }: Props) => {
    const [transactions, setTransactions] = useState<VoyagerTransaction[]>([])
    const [buyerAddress, setBuyerAddress] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [contractInformation, setContractInformation] = useState<object>({})
    const [page, setPage] = useState(1)

    async function getContractInformation() {
        setLoading(true)
        try {
            const res = await getContractFromVoyager(pageId)
            const { data } = res

            setContractInformation(data)
        } catch (error) {
            console.error('error fetching contract information', error)
            setError(
                'Failed to fetch contract information, check console for more information. Make sure the url is a valid or active ZkPage address.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContractInformation()
    }, [pageId])

    async function getTransactions(address?: string, type?: string) {
        setLoading(true)
        setError(null)

        try {
            const res = await getTransactionsFromVoyager(
                address || pageId,
                page,
                type
            )
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
            <div className="text-l text-gray-800 font-bold my-4">
                Lookup contract interactions by buyer address
            </div>
            <Tabs defaultValue="tx" className="w-[600px]">
                <TabsList>
                    <TabsTrigger value="tx">View Receipts</TabsTrigger>
                    <TabsTrigger value="contract">
                        Store Information
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tx">
                    <Input
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        placeholder="Enter buyer address: 0x..."
                    />

                    <Button
                        className="mt-4 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                        variant={'default'}
                        disabled={loading}
                        onClick={() => getTransactions(buyerAddress, 'INVOKE')}
                    >
                        Get transactions
                    </Button>

                    {noTransactions && !error && (
                        <div className="text-gray-500 mt-2">
                            No transactions found for store address: {pageId}
                        </div>
                    )}

                    {transactions.map((txn, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                            onClick={() => {
                                window.open(getExplorerUrl(txn.hash, true))
                            }}
                        >
                            <div className="flex items-center">
                                <div className="text-gray-500">
                                    {formatDate(txn.timestamp * 1000)}
                                </div>
                                <div className="text-gray-500 ml-4">
                                    {abbreviate(txn.hash, 6)}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-500">{txn.type}</div>
                                <div className="text-gray-500 ml-4">
                                    Fee: {txn.actualFee}
                                </div>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="contract">
                    {contractInformation && (
                        <div>
                            <RenderObject
                                obj={contractInformation || {}}
                                title="Contract information"
                            />
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {error && <div className="text-red-500">{error}</div>}
            {/* Pulled from voyager link */}
        </div>
    )
}

export default ViewReceipts
