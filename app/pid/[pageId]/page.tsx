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
    transformMetadata,
} from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Address, Chain, createPublicClient, http } from 'viem'
import { writeContract } from '@wagmi/core'

import { DEMO_PAGE } from '@/lib/constants'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import {
    useContract,
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
} from '@starknet-react/core'
import { PAGE_CONTRACT_SIERRA } from '@/lib/contract/sierra'

const RESULT_KEYS = [
    'name',
    'description',
    'recipientName',
    'recipientAddress',
    'owner',
    'network',
    'attestationId',
]

interface Params {
    pageId: Address
}

export default function ZkPage({ params }: { params: Params }) {
    const [loading, setLoading] = useState(true)
    // const [data, setData] = useState<PageData | undefined>()
    const [result, setResult] = useState<any>(null)
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const ref = useRef(null)
    const { primaryWallet } = useDynamicContext()
    const router = useRouter()
    const { pageId } = params
    const { address, account } = useAccount()
    const { chain } = useNetwork()

    const { contract } = useContract({
        abi: PAGE_CONTRACT_SIERRA.abi,
        address: pageId,
    })

    const calls = useMemo(() => {
        if (!pageId || !contract) return []
        return contract.populateTransaction['purchase']!(pageId, {
            low: 1,
            high: 0,
        })
    }, [contract, address])

    const {
        writeAsync,
        data: writeData,
        isPending,
    } = useContractWrite({
        calls,
    })

    const {
        data: contractData,
        isError,
        isLoading,
        error: contractError,
    } = useContractRead({
        functionName: 'get_metadata',
        args: [],
        abi: PAGE_CONTRACT_SIERRA.abi,
        address: pageId,
        watch: true,
    })

    // https://wagmi.sh/react/guides/read-from-contract
    // const { data: balance } = useReadContract({
    //     ...wagmiContractConfig,
    //     functionName: 'balanceOf',
    //     args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    //   })

    const isReady = !isLoading && !isError && contractData

    const data = isReady ? transformMetadata(contractData as string) : DEMO_PAGE

    async function purchaseRequest(itemId?: string) {
        if (!data) {
            alert('No data to purchase - try another url')
            return
        }

        setPurchaseLoading(true)

        try {
            const res = await writeAsync()

            console.log('purchaseRequest validate', res)
            alert('Thanks for your purchase')
        } catch (error) {
            console.log('error completing purchase ', error)
            setError(error)
        }
        setPurchaseLoading(false)
    }

    if (loading) {
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

    const invalid = !loading && !data

    const getTitle = () => {
        if (error) {
            return 'Error accessing Page'
        }
        return data?.name || 'Page'
    }

    return (
        // center align
        <div className="flex flex-col items-center justify-center mt-8">
            <BasicCard
                title={getTitle()}
                // description="Find and verify a fund request using your wallet."
                className="max-w-[1000px] p-4"
            >
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

                {data && (
                    <div className="mt-8 space-y-8">
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
                                        className="mt-4 flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={() => {
                                            purchaseRequest(item.id)
                                        }}
                                    >
                                        {purchaseLoading && (
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Purchase
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                )}

                {result && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Result</h3>
                        <p>{result}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-2 text-red-500">{error.message}</div>
                )}
            </BasicCard>
        </div>
    )
}
