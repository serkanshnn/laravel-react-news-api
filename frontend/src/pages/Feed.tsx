import React from "react";
import ArticleCard from "../components/ArticleCard.tsx";
import {useQuery} from "react-query";
import {fetchMyFeed} from "../apis.ts";
import {IArticle} from "../types.ts";
import useDebounce from "../hooks/useDebounce.tsx";
import {Link, useLocation} from "react-router-dom";

function Feed() {
    const [page, setPage] = React.useState<number>(1)
    const location = useLocation();

    const debouncedPage = useDebounce(page, 300)

    const {data: response, refetch} = useQuery(['articles', debouncedPage], () => fetchMyFeed({page: debouncedPage, per_page: 6}), {keepPreviousData: true, staleTime: 1000});

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPage(Number(params.get('page')) || 1)

        refetch()
    }, [location.search]);

    const pageList = () => {
        const listItems = [];
        const currentPage = page - 2 <= 0 ? 3 : page;
        const lastPage = response?.data?.meta?.last_page > currentPage + 2 ? currentPage + 2 : response?.data?.meta?.last_page;

        for (let i = currentPage - 2; i <= lastPage; i++) {
            listItems.push(<Link to={`/my-feed?page=${i}`}
                                 className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === i && 'z-10 bg-gray-800 hover:bg-gray-800 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'}`}>{i}</Link>);
        }
        return listItems;
    };


    return (
        <>
            <div className="bg-gray-100 px-2 py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
                    <div className="flex items-center justify-between mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">My Feed</h2>
                    </div>
                    <div
                        className="mx-auto mt-3 pt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 border-t border-gray-300">

                        {response?.data?.data?.map((item: IArticle, index: number) => {
                            return <ArticleCard key={index} item={item}/>
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a href="#"
                           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                        <a href="#"
                           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 flex gap-1">
                                <span>Showing</span>
                                <span className="font-medium">{response?.data?.meta?.from}</span>
                                <span>to</span>
                                <span className="font-medium">{response?.data?.meta?.to}</span>
                                <span>of</span>
                                <span className="font-medium">{response?.data?.meta?.total}</span>
                                <span>results</span>
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                 aria-label="Pagination">
                                <button onClick={() => setPage(page > 1 ? page - 1 : page)}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                {pageList()}

                                <button
                                    onClick={() => setPage(page < response?.data?.meta?.last_page ? page + 1 : page)}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Feed
