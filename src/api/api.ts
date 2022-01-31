import axios from "axios";
import {apiType, commentsApi} from "../types/allTypes";

export const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export const getNews = () => {
    return instance.get(`topstories.json?print=pretty`)
}
export const getItem = (id: number) => {
    return instance.get<apiType[]>(`item/${id}.json?print=pretty`)
}
export const getComments = (id: number) => {
    return instance.get<commentsApi>(`item/${id}.json?print=pretty`)
}