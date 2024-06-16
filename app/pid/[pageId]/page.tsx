import { useParams } from 'next/navigation'

const StorePage = () => {
    const isOwner = true

    const params = useParams()

    const { pageId } = params

    return (
        <div>
            <h1>Store Page: {pageId}</h1>
        </div>
    )
}

export default StorePage
