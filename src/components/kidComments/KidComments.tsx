import {commentsApi} from "../../types/allTypes";

type kidCommentsType = {
    comment: commentsApi
}


export const KidComments = ({comment}:kidCommentsType) => {

    return(
        <div>
            {comment.text}
        </div>
    )
}