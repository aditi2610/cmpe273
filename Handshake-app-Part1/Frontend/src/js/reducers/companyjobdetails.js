import { COMPANY_JOB_DETAILS } from "../constants/action-types";

const initialJobData = {
    id: "",
    title: "",
    description: "",
    category: "",
    postingDate: "",
    deadline: "",
    city: "",
    state: "",
    country: "",
    salary: ""

}

var companyJobDetailsReducer = (state = initialJobData, action) => {

    if (action.type === COMPANY_JOB_DETAILS) {
        console.log("********* Inside companyDetails");
        return (Object.assign({}, state, action.payload));
    }
    return state;
}

export default companyJobDetailsReducer;