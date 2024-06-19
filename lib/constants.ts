import { PageData } from './types'

import { sepolia } from '@starknet-react/chains'
import {
    argent,
    braavos,
} from '@starknet-react/core'

// https://github.com/apibara/starknet-react/blob/dccd4c71863bd19cdd1985fc67d22c03b2bf893e/packages/chains/src/starknet.ts#L113
export const SUPPORTED_CHAINS = [sepolia]
export const SUPPORTED_CONNECTORS = [braavos()]


export const SEPOLIA = {
    id: BigInt("0x534e5f5345504f4c4941"),
    network: "sepolia",
    name: "Starknet Sepolia Testnet",
    nativeCurrency: {
      address:
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    testnet: true,
    rpcUrls: {
      // alchemy: {
      //   http: [],
      // },
      blast: {
        http: ["https://starknet-sepolia.blastapi.io"],
      },
      infura: {
        http: ["https://starknet-sepolia.infura.io/v3"],
      },
      // lava: {
      //   http: [],
      // },
      nethermind: {
        http: ["https://rpc.nethermind.io/sepolia-juno"],
      },
      reddio: {
        http: ["https://starknet-sepolia.reddio.com"],
      },
      default: {
        http: [],
      },
      public: {
        http: [
          "https://starknet-sepolia.public.blastapi.io",
          "https://free-rpc.nethermind.io/sepolia-juno",
        ],
      },
    },
    explorers: {
      starkscan: ["https://sepolia.starkscan.co"],
      voyager: ["https://sepolia.voyager.online"],
    },
  }

export const DEMO_PAGE: PageData = {
    name: `Chris' demo zk store`,
    owner: '0x1234567890123456789012345678901234567890',
    description: `Welcome to my store! Feel free to browse and purchase my digital items below. All proceeds go to a charitable wallet address.`,
    items: [
        {
            name: 'Introduction to Python Programming',
            description:
                "A comprehensive beginner's guide to programming in Python. Learn the basics and start coding your first projects!",
            link: 'https://www.udemy.com/course/python-for-beginners/',
            price: '0.01',
        },
        {
            name: 'Mastering Web Development',
            description:
                'An advanced course on web development covering HTML, CSS, JavaScript, and modern frameworks. Build professional websites and web applications.',
            link: 'https://www.coursera.org/specializations/web-design',
            price: '0.017',
        },
        {
            name: 'Data Science with Python',
            description:
                'Learn data analysis, visualization, and machine learning using Python. This course covers everything you need to start a career in data science.',
            link: 'https://www.edx.org/professional-certificate/harvardx-data-science',
            price: '0.02',
        },
    ],
}
