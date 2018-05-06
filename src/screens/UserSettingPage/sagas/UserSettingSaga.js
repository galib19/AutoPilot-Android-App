import {
    USER_SETTING_LOGOUT,
    USER_SETTING_LOGOUT_SUCCESS,
    USER_SETTING_LOGOUT_FAILURE
} from '../constants/UserSettingConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';

function* logoutApi(action) {
    try {
        const logoutResponse = yield call(AxiosService.postServiceData, ApiService.LOGOUT, {}, true);
        showToast(AppText.LOGOUT_SUCCESSFULLY);
        yield put({type: USER_SETTING_LOGOUT_SUCCESS});
        yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
    } catch (error) {
        yield put({type: USER_SETTING_LOGOUT_FAILURE});
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

export const userSettingScreenSaga = [
    takeEvery(USER_SETTING_LOGOUT, logoutApi)
];