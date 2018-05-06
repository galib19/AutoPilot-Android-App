import {
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD,
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_FAILURE
} from '../constants/ChangePasswordConstant';

const initialState = {
    isFetching: false
};

export default function changePasswordScreenReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD:
            return {
                ...state,
                isFetching: true
            };
        case CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case CHANGE_PASSWORD_SCREEN_CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}