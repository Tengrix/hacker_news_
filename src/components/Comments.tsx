import {useDispatch} from "react-redux";
import {commentsApi} from "../types/allTypes";
import {useEffect} from "react";
import {getComments} from "../api/api";

type commentsType = {
    comments: number
    comment: commentsApi[]
}
export const Comments = ({comments, comment}: commentsType) => {
    const dispatch = useDispatch()
    useEffect(() => {

    }, [])
    return (
        <div>

        </div>
    )
}