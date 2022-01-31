import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type appReducerType = {
    isLoading:boolean
}
const appReducerState:appReducerType = {
    isLoading:false
}
const slice = createSlice({
    name:'appReducer',
    initialState:appReducerState,
    reducers:{
        setLoadingState(state,action:PayloadAction<{value:boolean}>){
            state.isLoading = action.payload.value
        }
    }
})
export const {setLoadingState} = slice.actions
export const appReducer = slice.reducer