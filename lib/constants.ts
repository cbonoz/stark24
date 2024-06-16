import { PageData } from './types'

export const DEMO_PAGE: PageData = {
    name: 'Request',
    description: 'This is a request',
    // items are digital items for sale
    items: [
        {
            name: 'Item 1',
            description: 'This is item 1',
            link: 'https://google.com',
            price: '1.0',
        },
        {
            name: 'Item 2',
            description: 'This is item 2',
            link: 'https://google.com',
            price: '2.0',
        },
        {
            name: 'Item 3',
            description: 'This is item 3',
            link: 'https://google.com',
            price: '3.0',
        },
    ],
}
