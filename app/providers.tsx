'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { StarknetWalletConnectors } from '@dynamic-labs/starknet'

type Props = {
    children: ReactNode
    initialState?: State | undefined
}

const queryClient = new QueryClient()

export function Providers({ children }: Props) {
    return (
        <DynamicContextProvider
            settings={{
                environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || '',
                walletConnectors: [StarknetWalletConnectors],
            }}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </DynamicContextProvider>
    )
}
