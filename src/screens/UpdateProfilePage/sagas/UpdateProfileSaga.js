import {
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE,
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_FAILURE
} from '../constants/UpdateProfileConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';
import UploadService from '../../../network/UploadService';
import {showToast} from '../../../components/AlertView/AlertShow';
import AppText from '../../../constants/AppText';

function* updateProfile(action) {
    try {
        const updateProfileResponse = yield call(UploadService.uploadFileViaFetchBlob, ApiService.UPDATE_PROFILE, action.body, true);
        const userInfoResponse = yield call(AxiosService.postServiceData, ApiService.USER_INFO, {}, true);
        const userData = userInfoResponse.data.success;
        yield put({type: UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_SUCCESS, userData});
        showToast(AppText.UPDATE_PROFILE_SUCCESSFULLY);
        yield put({type: RESET_PAGE, nextPage: 'IncidentDashboard'});
    } catch (error) {
        yield put({type: UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_FAILURE});
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

export const updateProfileScreenSaga = [
    takeEvery(UPDATE_PROFILE_SCREEN_UPDATE_PROFILE, updateProfile)
];