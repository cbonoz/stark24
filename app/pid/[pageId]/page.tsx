'use client'

import BasicCard from '@/components/basic-card'
import RenderObject from '@/components/render-object'
import { Button } from '@/components/ui/button'
import { PAGE_CONTRACT } from '@/lib/contract/metadata'
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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Address, Chain, createPublicClient, http } from 'viem'
import { writeContract } from '@wagmi/core'

import {
    useAccount,
    useChainId,
    useChains,
    useSwitchChain,
    useWriteContract,
} from 'wagmi'
import { DEMO_PAGE } from '@/lib/constants'
import { PageData } from '@/lib/types'

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
    const [data, setData] = useState<PageData | undefined>()
    const [result, setResult] = useState<any>(null)
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const ref = useRef(null)
    const { address } = useAccount()

    const router = useRouter()

    const { pageId } = params

    async function fetchData() {
        setLoading(true)
        try {
            // const publicClient = createPublicClient({
            //     chain: currentChain,
            //     transport: http(),
            // })
            // let contractData: ContractMetadata = transformMetadata(
            //     (await publicClient.readContract({
            //         abi: PAGE_CONTRACT.abi,
            //         address: requestId,
            //         functionName: 'getMetadata',
            //     })) as ContractMetadata
            // )
            // convert balance and validatedAt to number from bigint
            const contractData = DEMO_PAGE

            console.log('contractData', contractData)
            setData(contractData)

            // if (contractData.attestationId && SCHEMA_ID) {
            //     const res = await getAttestation(contractData.attestationId)
            //     console.log('getAttestation', res)
            // }
        } catch (error) {
            console.log('error reading contract', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // https://wagmi.sh/react/guides/read-from-contract
    // const { data: balance } = useReadContract({
    //     ...wagmiContractConfig,
    //     functionName: 'balanceOf',
    //     args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    //   })

    async function purchaseRequest(itemId?: string) {
        if (!data) {
            alert('No data to purchase - try another url')
            return
        }

        setPurchaseLoading(true)

        try {
            // const res = await writeContract(config, {
            //     abi: PAGE_CONTRACT.abi,
            //     address: pageId,
            //     functionName: 'purchase',
            //     args: [itemId],
            // })

            console.log('purchaseRequest validate')
            await fetchData()
            alert('Thanks for your purchase')
        } catch (error) {
            console.log('error completing purchase ', error)
            setError(error)
        }
        setPurchaseLoading(false)
    }

    useEffect(() => {
        if (address) {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [address])

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

                {data && (
                    <div className="mt-4">
                        <RenderObject title="Data" obj={data} />

                        {data?.items.map((item, index) => {
                            return (
                                <div key={index} className="mt-4">
                                    <h3 className="text-lg font-bold">
                                        {item.name}
                                    </h3>
                                    <p>{item.description}</p>
                                    <p>{formatCurrency(Number(item.price))}</p>
                                    <Button
                                        onClick={() => {
                                            purchaseRequest(item?.id)
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
