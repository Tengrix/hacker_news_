import React, {useEffect, useState} from "react";
import {apiType, commentsApi} from "../../types/allTypes";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../redux-store/store";
import {getAllComments, getServerNewsId} from "../../redux-store/stateReducer";
import Loading from "../../utils/Loading";
import {Comments} from "../comments/Comments";
import {Col, Row} from "antd";
import s from './singleNews.module.scss'

type singleNewsType = {
    news: apiType[];
    getHours: (date: number) => number;
}
export const SingleNews = ({news,getHours}: singleNewsType) => {
    const dispatch = useDispatch()
    const {newsId} = useParams<{ newsId: string }>()
    const kidComments = useSelector<AppRootStateType, commentsApi[]>(state => state.statePage.comments)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.appPage.isLoading)
    const [hide,setHide] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getServerNewsId())
        dispatch(getAllComments(+newsId))
        // const interval = setInterval(() => {
        //     dispatch(getAllComments(+newsId))
        //
        // }, 1000)
        // return () => clearInterval(interval)
    }, [])

    return (
        <div>
            {!isLoading ? <Loading/> :
                news.map(el =>
                    <div key={el.id}>
                        {el.id === +newsId &&
                        <div>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                <div className={s.news}>
                                    <Col className="gutter-row" span={6}>
                                        <div>
                                        <span> {el.title}
                                            <a href={el.url}>🔗</a>
                                        </span>
                                        </div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div>Date: {el.time}</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div>By: {el.by}</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div>Published: {getHours(el.time)} hours ago </div>
                                        <div>Points: {el.score}</div>
                                        <div>Comments: {el.kids?.length}</div>
                                    </Col>
                                </div>


                            {kidComments.slice(0,5).map(el =>
                                <Comments
                                    key={el.id}
                                    comment={el}
                                    getHours={getHours}
                                />
                            )}
                                </Row>
                        </div>
                        }
                    </div>
                )}
        </div>
    )
}