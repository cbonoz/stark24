import { Inter } from 'next/font/google'
import './globals.css'
import NavHeader from '@/components/nav-header'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Providers>
                <body className={inter.className}>
                    <NavHeader />
                    <div>{children}</div>
                </body>
            </Providers>
        </html>
    )
}
