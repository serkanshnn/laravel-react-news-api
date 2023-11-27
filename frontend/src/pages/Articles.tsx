import React from "react";
import ArticleCard from "../components/ArticleCard.tsx";
import {useQuery} from "react-query";
import {fetchArticles, fetchAuthors, fetchCategories, fetchSources} from "../apis.ts";
import {IArticle} from "../types.ts";
import useDebounce from "../hooks/useDebounce.tsx";
import Datepicker, {DateValueType} from "react-tailwindcss-datepicker";
import {Link, useLocation, useNavigate} from "react-router-dom";

function Articles() {
    const [page, setPage] = React.useState<number>(1)
    const [q, setQ] = React.useState<string>('')
    const [from, setFrom] = React.useState<Date | string>('')
    const [to, setTo] = React.useState<Date | string>('')
    const [categoryId, setCategoryId] = React.useState<number | string>('')
    const [sourceId, setSourceId] = React.useState<number | string>('')
    const [authorId, setAuthorId] = React.useState<number | string>('')
    const location = useLocation();
    const navigate = useNavigate();

    const debouncedPage = useDebounce(page, 300)
    const debouncedQ = useDebounce(q, 300)
    const debouncedFrom = useDebounce(from, 300)
    const debouncedTo = useDebounce(to, 300)
    const debouncedCategoryId = useDebounce(categoryId, 300)
    const debouncedSourceId = useDebounce(sourceId, 300)
    const debouncedAuthorId = useDebounce(authorId, 300)

    const debouncedParams = [debouncedPage, debouncedQ, debouncedFrom, debouncedTo, debouncedCategoryId, debouncedCategoryId, debouncedSourceId, debouncedAuthorId];

    const {data: response, refetch} = useQuery(['articles', ...debouncedParams], () => fetchArticles({page: debouncedPage, per_page: 6, q: debouncedQ, to: debouncedTo, from: debouncedFrom, author_id: debouncedAuthorId, category_id: debouncedCategoryId, source_id: debouncedSourceId}), {keepPreviousData: true, staleTime: 1000});
    const {data: responseSources} = useQuery('sources', () => fetchSources());
    const {data: responseCategories} = useQuery('categories', () => fetchCategories());
    const {data: responseAuthors} = useQuery('authors', () => fetchAuthors());

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPage(Number(params.get('page')) || 1)
        setQ(params.get('q') || '')
        setSourceId(params.get('source_id') || '' as string)
        setAuthorId(params.get('author_id') || '' as string)
        setCategoryId(params.get('category_id') || '' as string)
        setFrom(params.get('from') || '' as string)
        setTo(params.get('to') || '' as string)

        refetch()
    }, [location.search]);

    const handleSearch = (e: unknown) => {
        setPage(1)
        setQ(((e as InputEvent).target as HTMLInputElement).value)
        const params = new URLSearchParams(location.search);

        params.set('q', ((e as InputEvent).target as HTMLInputElement).value)
        params.set('page', '1')
        navigate(`/articles?${params}`)
    }

    const handleSelect = (e: unknown, setInput: (val: string) => void, key: string) => {
        setPage(1)
        const params = new URLSearchParams(location.search);
        params.set(key, ((e as InputEvent).target as HTMLInputElement).value || '')
        console.log(key, ((e as InputEvent).target as HTMLInputElement).value || '')
        params.set('page', '1')
        setInput(((e as InputEvent).target as HTMLInputElement).value)
        navigate(`/articles?${params}`)
    }

    const handleDate = (newValue: DateValueType, setInput: (val: string) => void, key: string) => {
        setPage(1)
        const params = new URLSearchParams(location.search);
        setInput(newValue?.startDate as string || '');
        params.set(key, newValue?.startDate as string || '')
        params.set('page', '1')
        navigate(`/articles?${params}`)
    }

    const pageList = () => {
        const listItems = [];
        const currentPage = page-2 <= 0 ? 3: page;
        const lastPage = response?.data?.meta?.last_page > currentPage+2 ? currentPage+2 : response?.data?.meta?.last_page;

        for (let i = currentPage-2; i <= lastPage; i++) {
            listItems.push(<Link to={`/articles?page=${i}`} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === i && 'z-10 bg-gray-800 hover:bg-gray-800 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'}`}>{i}</Link>);
        }
        return listItems;
    };


    return (
        <>
            <div className="bg-gray-100 px-2 py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
                    <div className="flex items-center justify-between mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">All articles</h2>
                    </div>

                    <div className={"flex gap-8 mt-5"}>
                        <div className={"w-full"}>
                            <label htmlFor="small"
                                   className="block mb-2 text-sm font-medium text-gray-900">Source</label>
                            <select id="small"
                                    onChange={(inputEvent) => handleSelect(inputEvent, setSourceId, 'source_id')}
                                    value={sourceId}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} selected>Choose a source</option>
                                {responseSources?.data?.data?.map((source: { id: number, name: string }, key: string) => {
                                    return <option key={key} value={source.id}>{source.name}</option>
                                })}
                            </select>
                        </div>

                        <div className={"w-full"}>
                            <label htmlFor="small"
                                   className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                            <select id="small"
                                    onChange={(e: unknown) => handleSelect(e, setAuthorId, 'author_id')}
                                    value={authorId}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} selected>Choose an author</option>
                                {responseAuthors?.data?.data?.map((source: { id: number, name: string }, key: string) => {
                                    return <option key={key} value={source.id}>{source.name}</option>
                                })}
                            </select>
                        </div>

                        <div className={"w-full"}>
                            <label htmlFor="small"
                                   className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="small"
                                    onChange={(e) => handleSelect(e, setCategoryId, 'category_id')}
                                    value={categoryId}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} selected>Choose a category</option>
                                {responseCategories?.data?.data?.map((source: { id: number, name: string }, key: string) => {
                                    return <option key={key} value={source.id}>{source.name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" onInput={handleSearch}
                                   value={q}
                                   className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search Mockups, Logos..."/>
                        </div>
                    </div>

                    <div className={"flex w-full gap-8 mt-5"}>
                        <div className={"w-full"}>
                            <label htmlFor="default-search"
                                   className="mb-2 text-sm font-medium text-gray-900">From</label>
                            <div className="relative">
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={{ startDate: from, endDate: from }}
                                    onChange={(newValue: DateValueType) => handleDate(newValue, setFrom, 'from')}
                                />
                            </div>
                        </div>

                        <div className={"w-full"}>
                            <label htmlFor="default-search"
                                   className="mb-2 text-sm font-medium text-gray-900">To</label>
                            <div className="relative">
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={{ startDate: to, endDate: to }}
                                    onChange={(newValue: DateValueType) => handleDate(newValue, setTo, 'to')}
                                />
                            </div>
                        </div>
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
                                <button onClick={() => setPage(page > 1 ? page-1: page)}
                                   className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                {pageList()}

                                <button onClick={() => setPage(page < response?.data?.meta?.last_page ? page+1: page)}
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

export default Articles
