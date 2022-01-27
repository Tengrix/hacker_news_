import React, {useEffect, useState} from "react";
import {apiType, commentsApi} from "../types/allTypes";
import {useDispatch, useSelector} from "react-redux";
import {getItem} from "../api/api";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../redux-store/store";
import {getAllComments, getServerNewsId} from "../redux-store/appReducer";

type singleNewsType = {
    news: apiType[]
}
export const SingleNews = ({news}: singleNewsType) => {
    const dispatch = useDispatch()
    const {newsId} = useParams<{ newsId: string }>()
    const kidComments = useSelector<AppRootStateType, commentsApi[]>(state => state.appPage.comments)
    console.log(kidComments)
    useEffect(()=>{
        dispatch(getServerNewsId())
        const interval = setInterval(() => {
            dispatch(getAllComments(+newsId))
        }, 2000)
        return () => clearInterval(interval)
    },[])
    return (
        <div>
            {news.map(el =>
                <div key={el.id}>
                    {el.id === +newsId &&
                    <div>
                    <span> {el.title}
                        <a href={el.url}>🔗</a>
                    </span>
                        <div>Date: {el.time}</div>
                        <div>By: {el.by}</div>
                        <div>Points: {el.score}</div>
                        <div>Comments: {el.kids?.length}</div>
                        {kidComments.map(el=>el.text)}
                    </div>
                    }
                </div>
            )}
        </div>
    )
}