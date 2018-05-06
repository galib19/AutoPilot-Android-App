import {
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD,
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_FAILURE
} from '../constants/ChangePasswordConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';

function* changePasswordApi(action) {
    try {
        const changePasswordResponse = yield call(AxiosService.postServiceData, ApiService.CHANGE_PASSWORD, action.body, true);
        const logoutResponse = yield call(AxiosService.postServiceData, ApiService.LOGOUT, {}, true);
        showToast(AppText.PASSWORD_CHANGED_SUCCESSFULLY);
        yield put({type: CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_SUCCESS});
        yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
    } catch (error) {
        yield put({type: CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            } else if (error.response.status === ResponseCode.NOT_FOUND) {
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

export const changePasswordScreenSaga = [
    takeEvery(CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD, changePasswordApi)
];