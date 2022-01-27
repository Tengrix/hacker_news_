import {AppRootStateType} from "./store";
import {getComments, getItem, getNews} from "../api/api";
import {Dispatch} from "react";
import {apiType, commentsApi, newsAppStateType} from "../types/allTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: newsAppStateType = {
    news: [],
    comments: []
}

const slice =createSlice({
    name:'appReducer',
    initialState,
    reducers: {
        setNewsState(state,action:PayloadAction<{news:apiType[]}>){
            state.news = action.payload.news
        },
        setComments(state,action:PayloadAction<{comments:commentsApi[]}>){
            state.comments = action.payload.comments
        }
    }
})
export const {setNewsState,setComments} = slice.actions
export const appReducer = slice.reducer

// export const appReducer = (state = initialState, action: ActionsType) => {
//     switch (action.type) {
//         case "SET-NEWS":
//             return {
//                 ...state, news: action.news
//             }
//         case "SET-COMMENTS":
//             return {
//                 ...state, comments: action.comments
//             }
//         default:
//             return state
//     }
// }
// export const appReducerAC = {
//     setNewsState(news: apiType[]) {
//         return {
//             type: 'SET-NEWS',
//             news
//         } as const
//     },
//     setComments(comments: commentsApi[]) {
//         return {
//             type: 'SET-COMMENTS',
//             comments
//         } as const
//     }
// }
export const getServerNewsId = () => async (dispatch: Dispatch<any>) => {
    try {
        const {data: storyIds} = await getNews()
        const stories = await Promise.all(
            storyIds.slice(0, 100).map((el: number) => getItem(el)))
        dispatch(setNewsState({news:stories.map(el => el.data)}))
        // const comments = await Promise.all(stories.map((el) =>
        //     el.data.hasOwnProperty('kids') && el.data.kids.map((el: number) => getComments(el).then(res=>console.log(res.data))))
        // )
        // dispatch(appReducerAC.setComments(comments.map(el=>el)))

    } catch (e) {
        console.log(e)
    }
}
export const getAllComments = (id:number) =>async (dispatch:Dispatch<any>, getState:()=>AppRootStateType) =>{
    const state = getState().appPage.news
    let newArr:number[] = []
    try {
        const filteredStateByKidsComments = state.filter(el=> id === el.id && el.kids)
        filteredStateByKidsComments.map((el)=>el.kids.map(el=>newArr.push(el)))
        const getComm = await Promise.all(newArr.map(el=>getComments(el)))
        dispatch(setComments({comments: getComm.map(el => el.data)}))
    }catch (e) {
        console.log(e)
    }
}
