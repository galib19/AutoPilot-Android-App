import {
    LOGIN_SCREEN_LOGIN
} from '../constants/LoginConstant';

export function callLoginApi(body) {
    return {
        type: LOGIN_SCREEN_LOGIN,
        body
    }
}