import {apiType} from "../../types/allTypes";
import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux-store/store";
import Loading from "../../utils/Loading";
import {Col, Row} from "antd";
import s from './news.module.scss'
type singleNewsType = {
    news: apiType[];
    getHours: (date: number) => number
}


export const News = ({news, getHours}: singleNewsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.appPage.isLoading)
    return (
        <div >
            {!isLoading ? <Loading/>:
            news.slice(0,5).map(el =>
                <div key={el.id} className={s.mainBlock}>
                    <Row>
                        <Col span={24} className={s.news}>
                            <Link to={`/news/${+el?.id}`}>
                                {el.title}
                            </Link>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={s.description}>
                        <Col className="gutter-row" span={6}>
                            <div>{el.score > 1 ? el.score + ' points' : el.score + ' point '}</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>by {el.by}</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>published {getHours(el.time)} hours ago</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>{el.kids?.length > 0 ? el.kids.length + ' comments' : ' 0 comments'}</div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}