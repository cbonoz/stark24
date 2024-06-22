import { RouteButtons } from '@/components/route-buttons'
import { config } from '@/util/site-config'
import { Metadata } from 'next'
import { CheckIcon } from '@radix-ui/react-icons'

export default function Home() {
    return (
        <main className="p-24 max-w-[1000px] centered content-center m-auto">
            {/* <h1 className="text-4xl font-bold">Welcome to zkpages</h1> */}
            {/* half width */}
            <div className="columns-1 gap-4 md:columns-2">
                <div>
                    <p className="text-xl font-bold pt-8">
                        {config.description}.
                    </p>

                    {config.valueSentences.map((sentence, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mt-4"
                        >
                            <svg
                                className="text-green-500"
                                width="32"
                                height="32"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <p>{sentence}.</p>
                        </div>
                    ))}

                    <div className="mt-8">
                        <RouteButtons />
                    </div>
                </div>
                <div className="flex">
                    <img src="/logo_3_2.png" alt="zkpages" className="my-4" />
                </div>
            </div>
        </main>
    )
}
