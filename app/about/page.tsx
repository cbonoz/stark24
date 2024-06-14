'use client'

import BasicCard from '@/components/basic-card'
import RenderObject from '@/components/render-object'
import { Button } from '@/components/ui/button'
import { createSchema } from '@/lib/ethsign'
import { useEthersSigner } from '@/lib/get-signer'
import { config } from '@/util/site-config'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { set } from 'react-hook-form'

const About = () => {
    const [loading, setLoading] = useState(false)

    const [result, setResult] = useState<any>(null)

    const signer = useEthersSigner()

    const getSchemaId = async () => {
        setLoading(true)
        try {
            const res = await createSchema()
            console.log('createSchema', res)
            setResult(res)
        } catch (error) {
            console.log('error creating schema', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <BasicCard
                title="About StarkFront"
                description="Learn more about StarkFront and how it works."
                className="min-w-[400px] p-4"
            >
                {config.about.map((section, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="text-lg font-bold">{section.title}</h3>
                        <p>{section.description}</p>
                    </div>
                ))}

                {/* <Button
                    onClick={getSchemaId}
                    disabled={loading}
                    className="mt-3"
                >
                    {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Get Schema ID
                </Button> */}

                {result && (
                    <div className="my-2">
                        <RenderObject title="Result" obj={result} />
                    </div>
                )}
            </BasicCard>
        </div>
    )
}
export default About
