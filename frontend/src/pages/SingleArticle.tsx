import {useMutation, useQuery} from "react-query";
import {favorite, fetchArticle} from "../apis.ts";
import {useParams} from "react-router-dom";
import stripTags from "../helpers/stripTags.ts";

const SingleArticle = () => {
    const params = useParams<{ id: string }>()
    const {data: response, refetch} = useQuery('article', () => fetchArticle(Number(params.id)))
    const mutation = useMutation(favorite)

    if (mutation.isSuccess) {
        refetch();
        mutation.reset();
    }


    return (
        <div className="bg-white px-6 py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <p className="text-base font-semibold leading-7">{response?.data?.data?.published_at}</p>

                <div className={"flex justify-between"}>
                    {response?.data?.data?.source && <div className={"flex gap-1 items-center"}>
                        <p className="text-base font-semibold leading-7 text-indigo-600">{response?.data?.data?.source?.name}</p>
                        <button
                            onClick={() => mutation.mutate({related_id: response?.data?.data?.source?.id, related_type: 'App\\Models\\Source'})}>
                            {response?.data?.data?.is_source_liked ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path
                                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                                </svg>}
                        </button>
                    </div>}

                    {response?.data?.data?.author && <div className={"flex gap-1 items-center"}>
                        <p className="text-base font-semibold leading-7 text-indigo-600">{response?.data?.data?.author?.name}</p>
                        <button
                            onClick={() => mutation.mutate({related_id: response?.data?.data?.author?.id, related_type: 'App\\Models\\Author'})}>
                            {response?.data?.data?.is_author_liked ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path
                                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                                </svg>}
                        </button>
                    </div>}
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{response?.data?.data?.title}</h1>
                {response?.data?.data?.category && <div className={"flex gap-1 items-center"}>
                    <p className="text-base font-semibold leading-7 text-indigo-600">{response?.data?.data?.category?.name}</p>
                    <button
                        onClick={() => mutation.mutate({related_id: response?.data?.data?.category?.id, related_type: 'App\\Models\\Category'})}>
                        {response?.data?.data?.is_category_liked ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path
                                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                            </svg>}
                    </button>
                </div>}
                {stripTags(response?.data?.data?.description || '').trim().length > 0 &&
                    <p className="mt-6 text-xl leading-8"
                       dangerouslySetInnerHTML={{__html: stripTags(response?.data?.data?.description).trim()}}/>}
                {response?.data?.data?.image_url && <figure className="mt-16">
                    <img className="aspect-video rounded-xl bg-gray-50 object-cover"
                         src={response?.data?.data?.image_url}
                         alt=""/>
                </figure>}
                <div className="mt-10 max-w-2xl">
                    <div dangerouslySetInnerHTML={{__html: response?.data?.data.content}}/>
                </div>
                <div className={"mt-3"}>
                    <span>URL: </span>
                    <a className={"text-gray-800 hover:text-gray-600"} target="_blank"
                       href={response?.data?.data?.url}>{response?.data?.data?.url}</a>
                </div>
            </div>
        </div>
    )
}

export default SingleArticle
