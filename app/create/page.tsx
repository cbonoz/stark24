'use client'

import BasicCard from '@/components/basic-card'
import UploadForm from '@/components/request-upload-form'
import { config } from '@/util/site-config'

const Upload = () => {
    return (
        // container classes centered
        <div className="flex flex-row justify-center mt-8">
            {/* make min width 400 */}
            <BasicCard
                className="w-[600px] p-4"
                title="Create new store front"
                description="Create a new store front. This page will become publicly available for other users to discover and make purchases."
            >
                <UploadForm />
            </BasicCard>

            <div>
                <BasicCard
                    className="w-[300px] h-[600px] px-2 py-6  mx-4 sticky top-24"
                    title="Steps"
                    description=""
                >
                    {config.steps.map((step, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-bold">
                                {index + 1}. {step.title}
                            </h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </BasicCard>
            </div>
        </div>
    )
}

export default Upload
