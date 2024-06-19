import { PageData } from './types'

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
