import {
    USER_SETTING_LOGOUT
} from '../constants/UserSettingConstant';

export function callLogoutApi() {
    return {
        type: USER_SETTING_LOGOUT
    }
}