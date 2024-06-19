'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { StarknetWalletConnectors } from '@dynamic-labs/starknet'

import { StarknetConfig, publicProvider } from '@starknet-react/core'
import { SUPPORTED_CHAINS, SUPPORTED_CONNECTORS } from '@/lib/constants'

type Props = {
    children: ReactNode
    initialState?: State | undefined
}

const queryClient = new QueryClient()

export function Providers({ children }: Props) {
    return (
        <StarknetConfig
            chains={SUPPORTED_CHAINS}
            provider={publicProvider()}
            connectors={SUPPORTED_CONNECTORS}
        >
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
        </StarknetConfig>
    )
}
