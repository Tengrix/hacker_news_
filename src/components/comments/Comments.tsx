import {useDispatch, useSelector} from "react-redux";
import {commentsApi} from "../../types/allTypes";
import React, {useState} from "react";
import {getTreeOfComments} from "../../redux-store/stateReducer";
import {AppRootStateType} from "../../redux-store/store";
import {KidComments} from "../kidComments/KidComments";
import s from './Comments.module.scss'
import {Col, Row} from "antd";


type commentsType = {
    comment: commentsApi;
    getHours: (date: number) => number;
}
export const Comments = ({comment, getHours}: commentsType) => {
    const kidComments = useSelector<AppRootStateType, commentsApi[]>(state => state.statePage.kids)
    const [hide, setHide] = useState<boolean>(false)

    const dispatch = useDispatch()
    const hideHandler = () => {
        dispatch(getTreeOfComments())
        setHide(!hide)
    }
    const converterToHTML = () => {
        return {__html: `${comment.text}`};
    }
    return (
        <Row gutter={[16, 24]}>

            <Col className="gutter-row" span={6}>
                <div className={s.mainBlock}>
                    <div className={s.infoBlock}>
                        Comment by: {comment.by} {getHours(comment.time)} hours ago <button
                        onClick={hideHandler}>{!hide ? `+` : `-`}</button>
                    </div>
                    <div className={s.commentsBlock}>
                        {hide && <div dangerouslySetInnerHTML={converterToHTML()}>
                        </div>}
                        {/*{comment.kids && <button onClick={hideHandler}>+</button>}*/}

                    </div>
                </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div>
                    {hide && kidComments.map(el =>
                        comment.id === el.parent &&
                        <div key={el.id}>
                            <button onClick={hideHandler}>+</button>
                            <KidComments comment={el}/>
                        </div>
                    )}
                </div>
            </Col>
        </Row>

    )
}