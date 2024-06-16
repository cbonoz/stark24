import { createConfig, WagmiProvider, useAccount } from 'wagmi'

import { sepolia } from 'viem/chains'

export const chainConfig = createConfig({
    chains: [starkSe],
    multiInjectedProviderDiscovery: false,
    transports: {
        [mainnet.id]: http(),
    },
})
