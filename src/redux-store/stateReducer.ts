import {AppRootStateType} from "./store";
import {getComments, getItem, getNews} from "../api/api";
import {Dispatch} from "react";
import {apiType, commentsApi, newsAppStateType} from "../types/allTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setLoadingState} from "./appReducer";


const initialState: newsAppStateType = {
    news: [],
    comments: [],
    kids:[]
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
        },
        setTreeOfComments(state,action:PayloadAction<{kids:commentsApi[]}>){
            state.kids = action.payload.kids
        }
    }
})
export const {setNewsState,setComments,setTreeOfComments} = slice.actions
export const stateReducer = slice.reducer

export const getServerNewsId = () => async (dispatch: Dispatch<any>) => {
    dispatch(setLoadingState({value:false}))
    try {
        const {data: storyIds} = await getNews()
        const stories = await Promise.all(
            storyIds.slice(0, 100).map((el: number) => getItem(el)))
        dispatch(setNewsState({news:stories.map(el => el.data)}))
        dispatch(setLoadingState({value:true}))

    } catch (e) {
        console.log(e)
    }
}
export const getAllComments = (id:number) =>async (dispatch:Dispatch<any>, getState:()=>AppRootStateType) =>{
    dispatch(setLoadingState({value:false}))
    const state = getState().statePage.news
    let newArr:number[] = []
    try {
        const filteredStateByKidsComments = state.filter(el=> id === el.id && el.kids)
        filteredStateByKidsComments.map((el)=>el.kids.map(el=>newArr.push(el)))
        const getComm = await Promise.all(newArr.map(el=>getComments(el)))
        dispatch(setComments({comments: getComm.map(el => el.data)}))
        dispatch(setLoadingState({value:true}))
    }catch (e) {
        console.log(e)
    }
}
export const getTreeOfComments = () => async (dispatch:Dispatch<any>, getState:()=>AppRootStateType)=> {
    const comments = getState().statePage.comments
    const newArr:number[] = []
    try {
        comments.map(el=>el.kids && el.kids.map(el=>newArr.push(el)))
        const getTree =await Promise.all(newArr.map(el=>getComments(el)))
        dispatch(setTreeOfComments({kids: getTree.map(el=>el.data)}))

    }catch (e){
        console.log(e)
    }
}