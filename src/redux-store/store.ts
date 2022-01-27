import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./appReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    appPage:appReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
