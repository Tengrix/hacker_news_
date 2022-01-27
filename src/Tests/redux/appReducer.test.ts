import {appReducer, setComments, setNewsState} from "../../redux-store/appReducer";

const testState = {
    news: [],
    comments: []
}

test('testing news state', () => {
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
    let setNews = setNewsState({news})
    let newState = appReducer(testState, setNews)
    expect(newState.news.length).toBe(2)

})

it('testing comments state',()=>{
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
    let action = setComments({comments})
    let newComments = appReducer(testState,action)
    expect(newComments.comments.length).toEqual(2)
})