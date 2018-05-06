import {
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE,
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_FAILURE
} from '../constants/UpdateProfileConstant';

import {saveDataToStorage} from '../../../components/StorageService/DataStorage';
import AsyncStorageConstant from '../../../constants/AsyncStorageConstant';

const initialState = {
    isFetching: false
};

export default function updateProfileScreenReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE_SCREEN_UPDATE_PROFILE:
            return {
                ...state,
                isFetching: true
            };
        case UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_SUCCESS:
            saveDataToStorage(AsyncStorageConstant.USER_PHONE_NUMBER, action.userData.phone);
            saveDataToStorage(AsyncStorageConstant.LOGIN_USER_DATA, action.userData);
            return {
                ...state,
                isFetching: false
            };
        case UPDATE_PROFILE_SCREEN_UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}