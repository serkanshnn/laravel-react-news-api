import Logo from "./Logo.tsx";
import Menu from "./Menu.tsx";

const Header = () => {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Logo />
                    </div>
                    <Menu />
                </div>
            </div>
        </nav>
    )
}

export default Header;
