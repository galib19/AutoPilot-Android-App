import {
    LOGIN_SCREEN_LOGIN,
    LOGIN_SCREEN_LOGIN_SUCCESS,
    LOGIN_SCREEN_LOGIN_FAILURE
} from '../constants/LoginConstant';

import {saveDataToStorage} from '../../../components/StorageService/DataStorage';
import AsyncStorageConstant from '../../../constants/AsyncStorageConstant';

const initialState = {
    isFetching: false
};

export default function loginScreenReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SCREEN_LOGIN:
            return {
                ...state,
                isFetching: true
            };
        case LOGIN_SCREEN_LOGIN_SUCCESS:
            saveDataToStorage(AsyncStorageConstant.USER_PHONE_NUMBER, action.userData.phone);
            saveDataToStorage(AsyncStorageConstant.USER_PASSWORD, action.password);
            saveDataToStorage(AsyncStorageConstant.LOGIN_USER_DATA, action.userData);
            return {
                ...state,
                isFetching: false
            };
        case LOGIN_SCREEN_LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}