import React from "react";
import {Link} from "react-router-dom";
import Banner from "../components/Banner.tsx";
import ArticleCard from "../components/ArticleCard.tsx";
import {useQuery} from "react-query";
import {fetchArticles} from "../apis.ts";
import {IArticle} from "../types.ts";

function Home() {
    const { data: response } = useQuery('articles', fetchArticles);

    return (
        <>
            <Banner />

            <div className="bg-gray-100 px-2 py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
                    <div className="flex items-center justify-between mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Latest articles</h2>
                        <Link to={'/articles'} className={"text-gray-800 hover:text-gray-600 text-md"}>All articles</Link>
                    </div>
                    <div
                        className="mx-auto mt-3 pt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 border-t border-gray-300">

                        {response?.data.data.map((item: IArticle) => {
                            return <ArticleCard item={item} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
