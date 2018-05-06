import {
    FORGOT_PASSWORD_SCREEN_GET_OTP,
    FORGOT_PASSWORD_SCREEN_GET_OTP_SUCCESS,
    FORGOT_PASSWORD_SCREEN_GET_OTP_FAILURE,
    FORGOT_PASSWORD_SCREEN_CHECK_OTP,
    FORGOT_PASSWORD_SCREEN_CHECK_OTP_SUCCESS,
    FORGOT_PASSWORD_SCREEN_CHECK_OTP_FAILURE,
    FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE,
    FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_SUCCESS,
    FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_FAILURE
} from '../constants/ForgotPasswordConstant';

const initialState = {
    isFetching: false,
    phoneNumber: '',
    keyToken: ''
};

export default function forgotPasswordScreenReducer(state = initialState, action) {
    switch (action.type) {
        case FORGOT_PASSWORD_SCREEN_GET_OTP:
            return {
                ...state,
                isFetching: true,
                phoneNumber: ''
            };
        case FORGOT_PASSWORD_SCREEN_GET_OTP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                phoneNumber: action.phoneNumber
            };
        case FORGOT_PASSWORD_SCREEN_GET_OTP_FAILURE:
            return {
                ...state,
                isFetching: false,
                phoneNumber: ''
            };
        case FORGOT_PASSWORD_SCREEN_CHECK_OTP:
            return {
                ...state,
                isFetching: true,
                keyToken: ''
            };
        case FORGOT_PASSWORD_SCREEN_CHECK_OTP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                keyToken: action.keyToken
            };
        case FORGOT_PASSWORD_SCREEN_CHECK_OTP_FAILURE:
            return {
                ...state,
                isFetching: false,
                keyToken: ''
            };
        case FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE:
            return {
                ...state,
                isFetching: true
            };
        case FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}