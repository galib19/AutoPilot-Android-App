import {
    LOGIN_SCREEN_LOGIN,
    LOGIN_SCREEN_LOGIN_SUCCESS,
    LOGIN_SCREEN_LOGIN_FAILURE
} from '../constants/LoginConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {saveDataToStorage} from '../../../components/StorageService/DataStorage';
import AsyncStorageConstant from '../../../constants/AsyncStorageConstant';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';

function* callLoginApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.LOGIN_API, action.body, false);
        const result = response.data;
        saveDataToStorage(AsyncStorageConstant.AUTHORIZATION_TOKEN, 'Bearer ' + result.success.token);
        const userInfoResponse = yield call(AxiosService.postServiceData, ApiService.USER_INFO, {}, true);
        const userData = userInfoResponse.data.success;
        const password = action.body.password;
        yield put({type: LOGIN_SCREEN_LOGIN_SUCCESS, userData, password});
        yield put({type: RESET_PAGE, nextPage: 'IncidentDashboard'});
    } catch (error) {
        yield put({type: LOGIN_SCREEN_LOGIN_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            } else if (error.response.status === ResponseCode.BAD_REQUEST) {
                showToast(AppText.LOGIN_ERROR_MESSAGE);
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

export const loginScreenSaga = [
    takeEvery(LOGIN_SCREEN_LOGIN, callLoginApi)
];