import {combineReducers, createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import { IsLoadingReducer } from "./reducers/IsLoadingReducer";
import { NotificationReducer } from "./reducers/NotificationReducer";



export const rootReducer = combineReducers({
    auth: AuthReducer,
    loading: IsLoadingReducer,
    notification: NotificationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});




export default store;