import {
    USER_SETTING_LOGOUT,
    USER_SETTING_LOGOUT_SUCCESS,
    USER_SETTING_LOGOUT_FAILURE
} from '../constants/UserSettingConstant';

const initialState = {
    isFetching: false
};

export default function userSettingScreenReducer(state = initialState, action) {
    switch (action.type) {
        case USER_SETTING_LOGOUT:
            return {
                ...state,
                isFetching: true
            };
        case USER_SETTING_LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case USER_SETTING_LOGOUT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}