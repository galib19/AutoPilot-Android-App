import {
    UPDATE_PROFILE_SCREEN_UPDATE_PROFILE
} from '../constants/UpdateProfileConstant';

export function callUpdateProfileApi(body) {
    return {
        type: UPDATE_PROFILE_SCREEN_UPDATE_PROFILE,
        body
    }
}