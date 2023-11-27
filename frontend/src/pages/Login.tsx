import {Link} from "react-router-dom";
import React, {FormEvent} from "react";
import {useMutation} from "react-query";
import {login} from "../apis.ts";
import {AxiosError} from "axios";

const Login = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const mutation = useMutation(login)
    const error: AxiosError = mutation?.error as AxiosError;
    const response: { data: { message: string } } = error?.response as { data: { message: string } };

    if (mutation.isSuccess) {
        const result: { token: string } = mutation.data.data.data;
        localStorage.setItem('accessToken', result.token);

        window.location.href = '/'
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        mutation.mutate({email, password});
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to
                    your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div className="mt-2">
                            <input onInput={(e) => setEmail((e.target as HTMLInputElement).value)} id="email"
                                   name="email" type="email" autoComplete="email" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onInput={(e) => setPassword((e.target as HTMLInputElement).value)} id="password"
                                   name="password" type="password" autoComplete="current-password" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button disabled={mutation.isLoading} type="submit"
                                className="disabled:opacity-50 flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Sign
                            in
                        </button>
                    </div>
                </form>

                {mutation.isError &&
                    <div
                        className="flex items-center p-4 mt-4 text-red-800 border border-1 rounded border-red-800 bg-red-50"
                        role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {response?.data?.message}
                        </div>
                    </div>}

                <p className="mt-10 text-center text-sm text-gray-500">
                    <span className={"mr-1"}>Not a member?</span>
                    <Link to={'/register'}
                          className="font-semibold leading-6 text-gray-800 hover:text-gray-600">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
