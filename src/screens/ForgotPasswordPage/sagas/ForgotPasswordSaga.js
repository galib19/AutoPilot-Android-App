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

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE, NEXT_PAGE} from '../../../constants/NavigationActionConstant';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';

function* callGetOTPApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.GET_OTP, action.body, false);
        const phoneNumber = action.body.phone;
        yield put({type: FORGOT_PASSWORD_SCREEN_GET_OTP_SUCCESS, phoneNumber});
        if (action.isGoToNextPage) {
            showToast(AppText.OTP_SEND_SUCCESSFULLY);
            yield put({type: NEXT_PAGE, nextPage: 'ForgotPasswordOtpScreen'});
        } else {
            showToast(AppText.OTP_RESEND_SUCCESSFULLY);
        }
    } catch (error) {
        yield put({type: FORGOT_PASSWORD_SCREEN_GET_OTP_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            } else if (error.response.status === ResponseCode.FORBIDDEN) {
                if (error.response.data && error.response.data.error && error.response.data.error.length > 0) {
                    showToast(error.response.data.error);
                }
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

function* callCheckOTPApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.CHECK_OTP, action.body, false);
        const keyToken = response.data.success.key_token;
        yield put({type: FORGOT_PASSWORD_SCREEN_CHECK_OTP_SUCCESS, keyToken});
        yield put({type: NEXT_PAGE, nextPage: 'ForgotPasswordScreen'});
    } catch (error) {
        yield put({type: FORGOT_PASSWORD_SCREEN_CHECK_OTP_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            } else if (error.response.status === ResponseCode.FORBIDDEN) {
                if (error.response.data && error.response.data.error && error.response.data.error.length > 0) {
                    showToast(error.response.data.error);
                }
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

function* callPasswordChangeApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.FORGOT_PASSWORD, action.body, false);
        yield put({type: FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_SUCCESS});
        showToast(AppText.PASSWORD_RESET_SUCCESSFULLY);
        yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
    } catch (error) {
        yield put({type: FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            } else {
                showToast(AppText.SOMETHING_WAS_WRONG);
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

export const forgotPasswordScreenSaga = [
    takeEvery(FORGOT_PASSWORD_SCREEN_GET_OTP, callGetOTPApi),
    takeEvery(FORGOT_PASSWORD_SCREEN_CHECK_OTP, callCheckOTPApi),
    takeEvery(FORGOT_PASSWORD_SCREEN_PASSWORD_CHANGE, callPasswordChangeApi)
];