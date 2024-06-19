export const config = {
    title: 'zkPages',
    description:
        'zkPages is a digital content store powered by Starknet, providing secure and scalable transactions using zero-knowledge proofs',
    isLocal: process.env.NEXT_PUBLIC_ENV === 'development',
    about: [
        {
            title: 'What is zkPages?',
            description:
                'zkPages is a digital content store that leverages Starknet and zero-knowledge proofs to offer a secure, scalable, and efficient platform for buying and selling digital content.',
        },
        {
            title: 'How does it work?',
            description:
                'zkPages allows users to create, share, and manage digital content securely. Utilizing zk-rollups, it ensures transactions are processed quickly and with minimal fees.',
        },
        {
            title: 'Disclaimer',
            description:
                'Note zkPages is currently a proof of concept prototype and is provided as-is without any guarantees. Use at your own discretion.',
        },
    ],
    steps: [
        {
            title: 'Create',
            description:
                'Create a digital content store page. A shareable link is generated that you can distribute to potential buyers.',
        },
        {
            title: 'Share',
            description:
                'Share your store page link with your audience. They can browse and purchase your digital content securely.',
        },
        {
            title: 'Optimize',
            description:
                'Review and optimize your store page based on user feedback and transaction data to enhance the user experience and increase sales.',
        },
    ],
}
