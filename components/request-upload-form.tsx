'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getExplorerUrl, isEmpty, storeUrl } from '@/lib/utils'
import Link from 'next/link'
import { Textarea } from './ui/textarea'
import { ReloadIcon } from '@radix-ui/react-icons'
import { deployContract } from '@/lib/contract/deploy'
import { useDynamicContext, useUserWallets } from '@dynamic-labs/sdk-react-core'
import { config } from '@/util/site-config'
import { useAccount, useConnect, useProvider } from '@starknet-react/core'
import { DEMO_PAGE, SEPOLIA } from '@/lib/constants'

const formSchema = z.object({
    title: z.string().min(3, {
        message: 'Request name must be at least 3 characters.',
    }),
    description: z.string().optional(),
    owner: z.string().optional(),
    items: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
            link: z.string(),
            price: z.string(),
        })
    ),
})

function UploadForm() {
    const [result, setResult] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [ready, setReady] = useState(false)

    const userWallets = useUserWallets()
    const { primaryWallet } = useDynamicContext()
    const { account, isConnected, address: starkAddress } = useAccount()
    const { provider } = useProvider()
    const { connect, connectors } = useConnect()

    const wallet = userWallets?.[0]
    const address = wallet?.address || starkAddress || ''
    const signer = {}
    const currentChain = SEPOLIA
    const setDemoData = async () => {
        form.setValue('title', `My Video clip store`)
        form.setValue('description', 'This is a demo store')
        form.setValue('owner', address)
        form.setValue('items', DEMO_PAGE.items)
    }

    const clearForm = () => {
        form.setValue('title', '')
        form.setValue('description', '')
        form.setValue('owner', '')
        form.setValue('items', [])
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    useEffect(() => {
        if (ready && isConnected) {
            onSubmit(form.getValues())
        }
    }, [ready, isConnected])

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        if (!isConnected) {
            const key = primaryWallet?.key
            const connectorIndex = key === 'braavos' ? 0 : 1

            connect({ connector: connectors[connectorIndex] })
            setReady(true)
            // setLoading(false)
            return
            // return
        }

        setError(null)
        try {
            const res: any = {}
            // upload contract

            const { title, description, items, owner } = values

            const itemString = JSON.stringify(items || DEMO_PAGE.items)

            const contractAddress = await deployContract(
                account,
                address,
                title,
                description || '',
                itemString
            )
            res['contractAddress'] = contractAddress
            res['contractUrl'] = getExplorerUrl(contractAddress)
            // res['cid'] = cid
            res['message'] =
                'Request created successfully. Share the below url with the intended recipient.'
            res['url'] = storeUrl(contractAddress)
            setResult(res)
            // scroll to result
            window.scrollTo(0, document.body.scrollHeight)
            clearForm()
        } catch (err: any) {
            console.error(err)
            setError(err?.message || 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const hasResult = !isEmpty(result)
    const currency = currentChain?.nativeCurrency?.symbol || 'ETH'
    const { user } = useDynamicContext()

    return (
        <div>
            {!hasResult && (
                <Form {...form}>
                    <a
                        href="#"
                        className="hover:underline text-purple-500 cursor-pointer pointer"
                        onClick={setDemoData}
                    >
                        Set demo data
                    </a>
                    <div>User: {JSON.stringify(user || {})}</div>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter store page name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`.1 ${currency} storefront verification`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the store.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Notes */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter page description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Additional description for the page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={loading || !address} type="submit">
                            {loading && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {!address
                                ? 'Connect wallet to continue'
                                : 'Create page'}
                        </Button>
                    </form>
                </Form>
            )}
            {hasResult && (
                <div className="pt-8">
                    <Button onClick={() => setResult(null)} variant="link">
                        {' '}
                        ← Create another page
                    </Button>

                    {/* center align */}
                    <div className="flex flex-col items-center  mt-8">
                        <svg
                            width="128"
                            height="128"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-xl mb-4">
                            Page created successfully
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-gray-500 text-sm my-2">
                                Share the below url to your zkPage.
                            </div>
                        </div>
                        <Link
                            href={result.url}
                            target="_blank"
                            className="text-blue-500 text-sm hover:underline"
                            rel="noopener noreferrer"
                        >
                            {result.url}
                        </Link>
                        <div className="mt-2">
                            {result?.contractUrl && (
                                <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                        window.open(result.contractUrl)
                                    }}
                                >
                                    View contract
                                </Button>
                            )}
                            &nbsp;
                            {result?.url && (
                                <Button
                                    variant={'default'}
                                    onClick={() => {
                                        window.open(result.url)
                                    }}
                                >
                                    View page
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="mt-2 text-red-500 max-w-3xl">{error}</div>
            )}
        </div>
    )
}

export default UploadForm
