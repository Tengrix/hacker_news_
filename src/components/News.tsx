import {apiType} from "../types/allTypes";
import React from "react";
import {Link} from "react-router-dom";

type singleNewsType = {
    news: apiType[];
    getHours: (date: number) => number
}

export const News = ({news, getHours}: singleNewsType) => {
    return (
        <div>
            {news.map(el =>
                <div key={el.id}>
                    <Link to={`/news/${+el.id}`}>
                        {el.title}
                    </Link>
                    <div>
                        {el.score > 1 ? el.score + ' points' : el.score + ' point '} by {el.by} published {getHours(el.time)} hours
                        ago {el.kids?.length > 0 ? el.kids.length + ' comments' : ' 0 comments'}
                    </div>
                </div>
            )}
        </div>
    )
}