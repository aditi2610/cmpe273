import { UPDATE_LOGIN_INFO } from "../constants/action-types";

const initialLoginData = {
    username: "",
    id: ""
}

var loginInfoReducer = (state = initialLoginData, action) => {
    console.log("!!!!!!!!! loginInfo reducer has been called ")
    switch (action.type) {
        case UPDATE_LOGIN_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
    // if (action.type === UPDATE_LOGIN_INFO) {
    //     return Object.assign({}, state, action.payload);
    // }
    // return state;
}

export default loginInfoReducer;