import {IArticle} from "../types.ts";
import stripTags from "../helpers/stripTags.ts";
import {Link} from "react-router-dom";

interface IArticleCard {
    item: IArticle
}

const ArticleCard = (props: IArticleCard) => {
    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime="2020-03-16" className="text-gray-500">{props.item.published_at}</time>
                    {props.item.category && <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{props.item.category?.name}</p>}
                </div>
                <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link to={`/articles/${props.item.id}`}>
                            <span className="absolute inset-0"></span>
                            {props.item.title}
                        </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 line-clamp-3 text-gray-600">{stripTags(props.item.description).trim() || stripTags(props.item.content).trim()}</p>

                </div>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0"></span>
                        <span className={"font-light line-clamp-1"}><span className={"font-semibold text-gray-900"}>Author: </span>{props.item.author?.name}</span>
                    </p>
                    <p className={"font-semibold text-gray-900"}>
                        <span className="font-light line-clamp-1"><span className={"font-semibold text-gray-900"}>Source: </span>{props.item.source?.name}</span>
                    </p>

                </div>
            </div>
        </article>
    )
}

export default ArticleCard;
