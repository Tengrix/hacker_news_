import {stateReducer, setComments, setNewsState, setTreeOfComments} from "./stateReducer";

const testState = {
    news: [],
    comments: [],
    kids:[]
}
let comments = [
    {
        by: 'SomeOne1',
        id: 12333,
        parent: 33213,
        text: 'Hello world',
        time: 12333213,
        type: 'comment'
    },
    {
        by: 'SomeOne1',
        id: 12333,
        parent: 33213,
        text: 'Hello world',
        time: 12333213,
        type: 'comment'
    }
]
let news = [
    {
        by: 'Someone',
        descendants: 12,
        id: 23231,
        kids: [12333],
        score: 5,
        time: 988465,
        title: 'Something',
        type: 'story',
        url: 'www.google.com',
    },
    {
        by: 'Someone',
        descendants: 12,
        id: 23231,
        kids: [12333],
        score: 5,
        time: 988465,
        title: 'Something',
        type: 'story',
        url: 'www.google.com',
    }
]
test('testing news state', () => {

    let setNews = setNewsState({news})
    let newState = stateReducer(testState, setNews)
    expect(newState.news.length).toBe(2)

})

it('testing comments state',()=>{

    let action = setComments({comments})
    let newComments = stateReducer(testState,action)
    expect(newComments.comments.length).toEqual(2)
})

test('testing kids comments state', () => {
    let action = setTreeOfComments({kids:comments})
    let newKidsComments = stateReducer(testState, action)
    expect(newKidsComments.kids.length).toBe(2)
})