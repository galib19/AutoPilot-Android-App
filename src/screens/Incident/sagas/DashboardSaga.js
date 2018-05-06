import {
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE,
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_SUCCESS,
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_FAILURE,
    INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY,
    INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY_SUCCESS,
    INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY_FAILURE
} from '../constants/DashboardConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';

function* callMostRecentCaseApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.MOST_RECENT_CASE, {}, true);
        const result = response.data.success.data;
        yield put({type: INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_SUCCESS, result});
    } catch (error) {
        yield put({type: INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

function* callAddDeviceKeyApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.ADD_DEVICE_KEY, action.body, true);
        yield put({type: INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY_SUCCESS});
    } catch (error) {
        yield put({type: INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY_FAILURE});
    }
}

export const dashboardScreenSaga = [
    takeEvery(INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE, callMostRecentCaseApi),
    takeEvery(INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY, callAddDeviceKeyApi)
];