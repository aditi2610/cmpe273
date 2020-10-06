import {UPDATE_USER_INFO} from "../constants/action-types";

const initialUserData = {
    username : "",
    password : "",
    student_id: ""
}

var userInfoReducer = (state = initialUserData, action) => {
    if (action.type === UPDATE_USER_INFO){
        return Object.assign(state, action.payload); 
    }
    return state;
}

export default userInfoReducer;