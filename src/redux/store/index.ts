import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer)

export default store

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']