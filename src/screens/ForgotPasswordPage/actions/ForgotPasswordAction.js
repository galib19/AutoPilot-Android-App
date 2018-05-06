import {
    FORGOT_PASSWORD_SCREEN_GET_OTP,
    FORGOT_PASSWORD_SCREEN_CHECK_OTP,
    FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE
} from '../constants/ForgotPasswordConstant';

export function callGetOtpApi(body, isGoToNextPage) {
    return {
        type: FORGOT_PASSWORD_SCREEN_GET_OTP,
        body,
        isGoToNextPage
    }
}

export function calCheckOtpApi(body) {
    return {
        type: FORGOT_PASSWORD_SCREEN_CHECK_OTP,
        body
    }
}

export function callPasswordChangeApi(body) {
    return {
        type: FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE,
        body
    }
}