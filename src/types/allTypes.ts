export type newsAppStateType = {
    news: apiType[];
    comments: commentsApi[];
}

export type apiType = {
    by: string;
    descendants: number;
    id: number;
    kids: Array<number>;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}
export type commentsApi = {
    by: string;
    id: number;
    parent: number;
    text: string;
    time: number;
    type: string;
}