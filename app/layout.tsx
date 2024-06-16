import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import './globals.css'
import NavHeader from '@/components/nav-header'
import { Providers } from './providers'
import { cookieToInitialState } from 'wagmi'
import { config } from './config'
import {
    DynamicContextProvider,
    DynamicWidget,
} from '@dynamic-labs/sdk-react-core'
import { StarknetWalletConnectors } from '@dynamic-labs/starknet'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <DynamicContextProvider
                settings={{
                    environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || '',
                    walletConnectors: [StarknetWalletConnectors],
                }}
            >
                <body className={inter.className}>
                    <NavHeader />
                    <div>{children}</div>
                </body>

            </DynamicContextProvider>
        </html>
    )
}
