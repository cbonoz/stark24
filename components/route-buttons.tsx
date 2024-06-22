'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useAccount } from 'wagmi'

export const RouteButtons = () => {
    const router = useRouter()
    return (
        <div className="flex space-x-4">
            <span>
                {' '}
                <Button
                    className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push('/upload')}
                >
                    Create store front
                </Button>
            </span>
            <span>
                <Button
                    className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push('/pid')}
                >
                    Discover store front
                </Button>
            </span>
        </div>
    )
}
