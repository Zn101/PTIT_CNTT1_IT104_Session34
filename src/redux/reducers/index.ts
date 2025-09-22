import { combineReducers } from "redux";
import studentReducer from "./student.reducer";

// Gộp tất cả các reducer lại với nhau
const rootReducer = combineReducers({
    student: studentReducer
})

export default rootReducer