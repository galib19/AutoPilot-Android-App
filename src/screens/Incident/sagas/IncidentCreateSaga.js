import {
    INCIDENT_CREATE_GET_SETTING,
    INCIDENT_CREATE_GET_SETTING_SUCCESS,
    INCIDENT_CREATE_GET_SETTING_FAILURE,
    INCIDENT_CREATE_NEW_INCIDENT,
    INCIDENT_CREATE_NEW_INCIDENT_SUCCESS,
    INCIDENT_CREATE_NEW_INCIDENT_FAILURE
} from '../constants/IncidentCreateConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';
import UploadService from '../../../network/UploadService';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';

function* getAllSetting(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.INCIDENT_CREATE_SETTING, {}, true);
        const result = response.data.success;
        yield put({type: INCIDENT_CREATE_GET_SETTING_SUCCESS, result});
    } catch (error) {
        yield put({type: INCIDENT_CREATE_GET_SETTING_FAILURE});
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

function* callIncidentCreateApi(action) {
    try {
        const uploadResponse = yield call(UploadService.uploadFileViaFetchBlob, ApiService.INCIDENT_CREATE, action.body, true);
        yield put({type: INCIDENT_CREATE_NEW_INCIDENT_SUCCESS});
        yield put({type: RESET_PAGE, nextPage: 'IncidentDashboard'});
        showToast(AppText.INCIDENT_CREATE_SUCCESSFULLY);
    } catch (error) {
        yield put({type: INCIDENT_CREATE_NEW_INCIDENT_FAILURE});
        if (error.response) {
            if (error.response.status === ResponseCode.AUTHORIZATION_FAILED) {
                yield put({type: RESET_PAGE, nextPage: 'LoginScreen'});
            }
        } else if (error.request) {
            showToast(AppText.SOMETHING_WAS_WRONG);
            console.log(error.request);
        } else {
            showToast(AppText.SOMETHING_WAS_WRONG);
            console.log('Error', error.message);
        }
    }
}

export const incidentCreateScreenSaga = [
    takeEvery(INCIDENT_CREATE_GET_SETTING, getAllSetting),
    takeEvery(INCIDENT_CREATE_NEW_INCIDENT, callIncidentCreateApi)
];