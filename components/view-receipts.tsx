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
import RenderObject from './render-object'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
    pageId: string
}

const ViewReceipts = ({ pageId }: Props) => {
    const [transactions, setTransactions] = useState<VoyagerTransaction[]>([])
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
            <div className="text-l text-gray-800 font-bold">Store Admin</div>
            <Tabs defaultValue="tx" className="w-[600px]">
                <TabsList>
                    <TabsTrigger value="tx">View Receipts</TabsTrigger>
                    <TabsTrigger value="contract">
                        Store Information
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tx">
                    {noTransactions && !error && (
                        <div className="text-gray-500">
                            No transactions found for store address: {pageId}
                        </div>
                    )}

                    {transactions.map((txn, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border-b border-gray-200 py-2"
                        >
                            <div className="flex items-center">
                                <div className="text-gray-500">
                                    {txn.timestamp}
                                </div>
                                <div className="text-gray-500 ml-4">
                                    {txn.hash}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-500">{txn.type}</div>
                                <div className="text-gray-500 ml-4">
                                    {txn.actualFee}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-2xl font-bold text-gray-800 mt-8">
                        {/* View Receipts{' '} */}
                        <span>
                            {/* refresh */}
                            <Button
                                variant={'ghost'}
                                disabled={loading}
                                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={getTransactions}
                            >
                                {/* {loading && (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )} */}
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                &nbsp; Refresh
                            </Button>
                        </span>
                    </div>
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
