import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getServerNewsId} from "./redux-store/appReducer";
import {News} from "./components/News";
import {Link, Route, Switch} from "react-router-dom";
import {AppRootStateType} from "./redux-store/store";
import {apiType} from "./types/allTypes";
import {SingleNews} from "./components/SingleNews";

function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, apiType[]>(state => state.appPage.news)

    useEffect(() => {
        dispatch(getServerNewsId())
        const interval = setInterval(() => {
            dispatch(getServerNewsId())
        }, 60000)
        return () => clearInterval(interval)
    }, [])
    const getHours = (time: number) => {
        const date = new Date(time * 1000);
        return date.getHours()
    }
    const updateHandler = () => {
        dispatch(getServerNewsId())
    }
    console.log(state)
    return (
        <div className="App">
            <button onClick={updateHandler}>update</button>
            <nav>
                <Link to="/mainPage" className={'mainMenu'}>Home</Link>
            </nav>
            <Switch>
                <Route path={'/mainPage'}>
                    <News
                        news={state}
                        getHours={getHours}
                    />
                </Route>
                <Route path={'/news/:newsId'}>
                    <SingleNews
                        news={state}
                    />
                </Route>
            </Switch>

        </div>
    );
}

export default App;
