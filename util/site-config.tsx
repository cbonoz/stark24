export const config = {
    title: 'zkPages',
    description:
        'ZkPages is a digital content store platform powered by Starknet, providing secure checkout pages using zero-knowledge proofs',
    isLocal: process.env.NEXT_PUBLIC_ENV === 'development',
    valueSentences: [
        // 'zkPages is a digital content store powered by Starknet',
        'Secure and scalable transactions using ZK-rollups on Starknet',
        'Create, share, and manage digital content securely',
        'No vendor agreements required',
    ],
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
            title: 'Notes on Testnet deployment',
            description: 'Note required payments/transfers are disabled on the testnet deployment',
        },
        {
            title: 'Disclaimer',
            description:
                'Note zkPages is currently a proof of concept prototype and is provided as-is without any guarantees. Try at your own discretion.',
        },
    ],
    steps: [
        {
            title: 'Create page',
            description:
                'Create a digital content store page. A shareable link is generated that you can distribute to potential buyers.',
        },
        {
            title: 'Share',
            description:
                'Share your store page link with your audience. They can browse and purchase your digital content securely.',
        },
        {
            title: 'Earn and optimize',
            description:
                'Collect payments and optimize your store page based on user feedback and transaction data to enhance the user experience and increase sales.',
        },
    ],
}
