import { UPDATE_USER_INFO } from "../constants/action-types";

import { UPDATE_LOGIN_INFO } from "../constants/action-types";
import { COMPANY_JOB_DETAILS } from "../constants/action-types.js";
import { COMPANY_EVENT_DETAILS } from "../constants/action-types.js";

export function updateUserInfo(payload) {
    return {
        type: UPDATE_USER_INFO
        , payload
    };
}

export function updateLoginInfo(payload) {
    return {
        type: UPDATE_LOGIN_INFO
        , payload
    };
}

export function getCompanyJobDetails(payload) {
    return {
        type: COMPANY_JOB_DETAILS,
        payload
    };
}

export function getCompanyEventDetails(payload) {
    return {
        type: COMPANY_EVENT_DETAILS,
        payload
    };
}
