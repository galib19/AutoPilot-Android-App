import {
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD
} from '../constants/ChangePasswordConstant';

export function callChangePasswordApi(body) {
    return {
        type: CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD,
        body
    }
}