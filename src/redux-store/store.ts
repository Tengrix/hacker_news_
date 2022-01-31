import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {stateReducer} from "./stateReducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    statePage:stateReducer,
    appPage:appReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
