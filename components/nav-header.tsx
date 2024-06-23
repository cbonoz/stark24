import { DynamicWidget } from '@dynamic-labs/sdk-react-core'

const NavHeader = () => {
    return (
        <header className="flex items-center h-16 bg-white-800 text-black px-4  border-b-4 border-gray-500 sticky top-0 z-50 bg-white">
            <div className="flex items-center">
                <a href="/" className="block">
                    <img
                        src="/logo.png"
                        alt="ZkPages Logo"
                        className="h-8 w-auto fill-current"
                    />
                </a>
                {/* <span className="ml-4 text-xl font-bold">ZkPages</span> */}
            </div>
            <nav className="flex">
                <a
                    href="/create"
                    className="text-gray-500 hover:underline mx-4"
                >
                    Create store front
                </a>
                |
                <a href="/pid" className="text-gray-500 hover:underline mx-4">
                    Lookup store front
                </a>
                |
                <a href="/about" className="text-gray-500 hover:underline mx-4">
                    About
                </a>
                {/* align right */}
            </nav>
            <span className="ml-auto align-right justify-end">
                {/* <SwitchNetwork /> */}
            </span>
            <span className="align-right justify-end">
                <DynamicWidget />
                {/* <ConnectWallet /> */}
            </span>
        </header>
    )
}

export default NavHeader
