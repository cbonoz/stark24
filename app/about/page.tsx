import BasicCard from '@/components/basic-card'
import { config } from '@/util/site-config'

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <BasicCard
                title="About ZkPages"
                description="Learn more about ZkPages and how it works."
                className="min-w-[400px] p-4"
            >
                {config.about.map((section, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="text-lg font-bold">{section.title}</h3>
                        <p>{section.description}</p>
                    </div>
                ))}
            </BasicCard>
        </div>
    )
}
export default About
