'use client'

import BasicCard from '@/components/basic-card'
import { Button } from '@/components/ui/button'
import {
    abbreviate,
    formatCurrency,
    formatDate,
    getAttestationUrl,
    getExplorerUrl,
    getIpfsUrl,
    isEmpty,
    transformMetadata,
} from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Address, Chain, createPublicClient, http } from 'viem'

import { DEMO_PAGE, VOYAGE_KEY } from '@/lib/constants'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import {
    useContract,
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
    useProvider,
    useConnect,
} from '@starknet-react/core'
import { PAGE_CONTRACT_SIERRA } from '@/lib/contract/sierra'
import ViewReceipts from '@/components/view-receipts'
import { PageData } from '@/lib/types'

interface Params {
    pageId: Address
}

export default function ZkPage({ params }: { params: Params }) {
    const [loading, setLoading] = useState(true)
    // const [data, setData] = useState<PageData | undefined>()
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const { primaryWallet } = useDynamicContext()
    const [result, setResult] = useState<any>()
    const { pageId } = params
    const [error, setError] = useState<Error | null>(null)
    const { account, isConnected, address: starkAddress } = useAccount()
    const [lastSelectedItemId, setLastSelectedItemId] = useState<number>(-1)
    const { connect, connectors } = useConnect()
    const [viewReceipts, setViewReceipts] = useState(false)

    const address = starkAddress || primaryWallet?.address

    const { contract } = useContract({
        abi: PAGE_CONTRACT_SIERRA.abi,
        address: pageId,
    })

    const {
        data: contractData,
        isError,
        isLoading,
        error: fetchError,
    } = useContractRead({
        functionName: 'get_metadata',
        args: [],
        abi: PAGE_CONTRACT_SIERRA.abi,
        address: pageId,
        watch: true,
    })

    const hasContract = !isLoading && !isError && contractData
    const data: PageData = hasContract
        ? transformMetadata(contractData as string)
        : (null as any)

    // https://starknet-react.com/demos/accounts
    const calls = useMemo(() => {
        if (!pageId || !contract || !account) {
            return []
        }
        const transactions = []
        const item = data?.items[lastSelectedItemId]
        if (item?.price) {
            const amount = Number(item.price) * 1e18
            transactions.push(
                contract.populateTransaction['transfer']!(data.owner, amount)
            )
        }

        transactions.push({
            contractAddress: pageId,
            entrypoint: 'purchase_item',
            calldata: [lastSelectedItemId],
        })
        return transactions
    }, [contractData, contract, account])

    useEffect(() => {
        if (lastSelectedItemId !== -1) {
            purchaseRequest()
        }
    }, [lastSelectedItemId])

    const {
        writeAsync,
        data: writeData,
        isPending,
        error: writeError,
    } = useContractWrite({
        calls,
    })

    useEffect(() => {
        if (!isEmpty(writeData?.transaction_hash)) {
            setResult({
                writeData: writeData,
                transaction_hash: writeData?.transaction_hash,
                contentUrl: data?.items[lastSelectedItemId].link,
            })
        }
    }, [writeData])

    const isOwner = data?.owner === address

    async function purchaseRequest() {
        if (!data) {
            alert('No data to purchase - try another url')
            return
        }

        setPurchaseLoading(true)

        try {
            if ((!isConnected && !ready) || !account) {
                const key = primaryWallet?.key
                const connectorIndex = key === 'braavos' ? 0 : 1

                connect({ connector: connectors[connectorIndex] })
                setReady(true)
                setTimeout(() => {
                    writeAsync()
                }, 5000)
            } else {
                const res = await writeAsync()
                setPurchaseLoading(false)
            }
        } catch (error) {
            console.log('error completing purchase ', error)
            setPurchaseLoading(false)
        } finally {
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center mt-8">
                Loading...
            </div>
        )
    }

    if (!address) {
        return (
            <div className="flex flex-col items-center justify-center mt-8">
                Please connect your wallet to view contracts
            </div>
        )
    }

    const toggleReceipts = () => {
        setResult(null)
        setViewReceipts(!viewReceipts)
    }

    const invalid = !loading && !data
    const generalError = error || fetchError
    const showAdmin = !!VOYAGE_KEY
    const isPurchasePending = isPending || purchaseLoading

    const getTitle = () => {
        if (generalError) {
            return 'Error finding page'
        }

        return data?.name || 'ZkPage'
    }

    return (
        // center align
        <div className="flex flex-col items-center justify-center mt-8">
            <BasicCard
                title={
                    <span>
                        <span>{data?.name || 'ZkPage'}</span>
                        {showAdmin && (
                            <span
                                onClick={toggleReceipts}
                                className="text-sm justify-end justify-right items-end ml-4 text-purple-500 cursor-pointer hover:underline"
                            >
                                {!viewReceipts
                                    ? 'View receipts'
                                    : 'Back to store'}
                            </span>
                        )}
                    </span>
                }
                // description="Find and verify a fund request using your wallet."
                className="max-w-[1000px] p-4"
            >
                {/* {JSON.stringify({ writeData, writeError, generalError })} */}
                {result && (
                    <div className="min-w-[800px]">
                        <div className="text-green-500 text-xl mb-8">
                            Thanks for your purchase!
                        </div>

                        <div className="my-4">
                            <Button
                                variant={'link'}
                                onClick={() => {
                                    setResult(null)
                                    setLastSelectedItemId(-1)
                                }}
                            >
                                {'<- Back to store'}
                            </Button>
                        </div>
                        {result?.transaction_hash && (
                            <span className="mt-4">
                                <Button
                                    variant={'link'}
                                    onClick={() =>
                                        window.open(
                                            getExplorerUrl(
                                                result.transaction_hash,
                                                true
                                            )
                                        )
                                    }
                                    className="text-purple-500 mx-4"
                                >
                                    View transaction
                                </Button>

                                {/* Go to content link based on index */}
                                <Button
                                    variant={'default'}
                                    onClick={() => {
                                        window.open(result.contentUrl)
                                    }}
                                >
                                    Access content
                                </Button>
                            </span>
                        )}
                    </div>
                )}

                {invalid && (
                    <div className="font-bold">
                        <p>
                            This contract may not exist or may be on another
                            network, double check your currently connected
                            network
                        </p>
                    </div>
                )}
                {/* <RenderObject title="Data" obj={data} /> */}

                {viewReceipts && <ViewReceipts pageId={pageId} />}

                {data && !result && !viewReceipts && (
                    <div className="mt-8 space-y-8">
                        <div>{data?.description}</div>

                        {data.items.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-6 border border-gray-200 rounded-lg shadow-md bg-white"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {item.description}
                                    </p>
                                    <p className="mt-2 text-gray-800 font-medium">
                                        {formatCurrency(Number(item.price))}
                                    </p>
                                    <Button
                                        disabled={isPurchasePending}
                                        className="mt-4 flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition-all duration-300 ease-in-out hover:cursor-pointer"
                                        onClick={() => {
                                            setLastSelectedItemId(index)
                                        }}
                                    >
                                        {isPurchasePending &&
                                            lastSelectedItemId == index && (
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                        Purchase
                                    </Button>
                                    {writeError &&
                                        lastSelectedItemId == index && (
                                            <div className="mt-2 text-red-500">
                                                {writeError.message}
                                            </div>
                                        )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {generalError && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-red-500">
                            Error
                        </h3>
                        <p>{generalError.message}</p>
                    </div>
                )}
            </BasicCard>
        </div>
    )
}
