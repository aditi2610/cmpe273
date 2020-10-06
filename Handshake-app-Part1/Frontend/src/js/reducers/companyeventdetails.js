import { COMPANY_EVENT_DETAILS } from "../constants/action-types";

const initialJobData = {
    id: "",
    name: "",
    description: "",
    eligibility: "",
    date: "",
    time: "",
    city: "",
    state: "",
    country: ""
}

var companyEventDetailsReducer = (state = initialJobData, action) => {

    if (action.type === COMPANY_EVENT_DETAILS) {
        console.log("********* Inside event  Details reducer");
        return (Object.assign({}, state, action.payload));
    }
    return state;
}

export default companyEventDetailsReducer;