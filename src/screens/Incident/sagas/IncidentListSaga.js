import {
    INCIDENT_LIST_SCREEN_ALL_CASE,
    INCIDENT_LIST_SCREEN_ALL_CASE_SUCCESS,
    INCIDENT_LIST_SCREEN_ALL_CASE_FAILURE
} from '../constants/IncidentListConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';

function* getAllIncidentApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.INCIDENT_LIST, action.parameter, true);
        const result = response.data.success;
        yield put({type: INCIDENT_LIST_SCREEN_ALL_CASE_SUCCESS, result});
    } catch (error) {
        yield put({type: INCIDENT_LIST_SCREEN_ALL_CASE_FAILURE});
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

export const incidentListScreenSaga = [
    takeEvery(INCIDENT_LIST_SCREEN_ALL_CASE, getAllIncidentApi)
];