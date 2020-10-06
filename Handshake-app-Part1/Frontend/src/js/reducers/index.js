import loginInfoReducer from "./logininfo";
import companyJobDetailsReducer from "./companyjobdetails";

import { combineReducers } from 'redux';
import companyEventDetailsReducer from "./companyeventdetails";

const finalReducers = combineReducers({
    loginInfo: loginInfoReducer,
    companyJob: companyJobDetailsReducer,
    companyEvent: companyEventDetailsReducer
})

export default finalReducers;