import React from "react";
import {useOnClickOutside} from "../hooks/useOnClickOutside.tsx";
import {useMutation} from "react-query";
import {logout} from "../apis.ts";
import {Link} from "react-router-dom";

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => setIsMenuOpen(false));

    const mutation = useMutation(logout)

    const isLoggedIn = Boolean(localStorage.getItem('accessToken'))

    if (mutation.isSuccess) {
        localStorage.removeItem('accessToken');

        window.location.href = '/'
    }

    return (
        <div
            ref={ref}
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
                {isLoggedIn ?
                    <div>
                        <button type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""/>
                        </button>
                    </div>
                    :
                    <p className=" text-center text-sm text-gray-500">
                        <Link to={'/login'} className="font-semibold leading-6 text-gray-300 hover:text-gray-400">Login</Link>
                        <span className={"mx-2"}>or</span>
                        <Link to={'/register'} className="font-semibold leading-6 text-gray-300 hover:text-gray-400">Register</Link>
                    </p>
                }

                {isMenuOpen && <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                    tabIndex={-1}>
                    <Link to="/my-feed" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                       tabIndex={-1} id="user-menu-item-0">My Feed</Link>
                    <button onClick={() => mutation.mutate()} className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                       tabIndex={-1} id="user-menu-item-2">Sign out</button>
                </div>}
            </div>
        </div>
    )
}

export default Menu
