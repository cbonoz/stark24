'use client'

import { useState } from 'react'
import BasicCard from '@/components/basic-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Sign = () => {
    const [pageId, setpageId] = useState<string>('')
    const router = useRouter()

    return (
        <div className="flex flex-row items-center justify-center mt-8">
            <BasicCard
                title="Find a store front"
                description="Discover a zkPage store front"
                className="min-w-[400px] p-4"
            >
                <Input
                    placeholder="Enter zkPage address"
                    value={pageId}
                    onChange={(e) => setpageId(e.target.value)}
                />

                <Button
                    className="mt-4"
                    onClick={() => {
                        console.log('Go to page: ' + pageId)
                        router.push(`/pid/${pageId}`)
                    }}
                >
                    Go to page
                </Button>
            </BasicCard>
        </div>
    )
}

export default Sign
