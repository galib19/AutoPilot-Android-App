import {
    COMMENT_SCREEN_ALL_COMMENT,
    COMMENT_SCREEN_ALL_COMMENT_SUCCESS,
    COMMENT_SCREEN_ALL_COMMENT_FAILURE,
    COMMENT_SCREEN_ADD_NEW_COMMENT,
    COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS,
    COMMENT_SCREEN_ADD_NEW_COMMENT_FAILURE,
    COMMENT_SCREEN_INITIALIZE_VALUE
} from '../constants/CommentConstant';

import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../network/ApiService';
import AxiosService from '../../../network/AxiosService';
import ResponseCode from '../../../network/ResponseCode';
import {RESET_PAGE} from '../../../constants/NavigationActionConstant';
import {delay} from 'redux-saga';

function* callGetAllCommentApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.ALL_COMMENT + '/' + action.body.id, action.parameter, true);
        const result = response.data.success;
        yield put({type: COMMENT_SCREEN_ALL_COMMENT_SUCCESS, result});
    } catch (error) {
        yield put({type: COMMENT_SCREEN_ALL_COMMENT_FAILURE});
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

function* callAddNewCommentApi(action) {
    try {
        const response = yield call(AxiosService.postServiceData, ApiService.ADD_COMMENT, action.body, true);
        const totalComment = response.data.success.total_comments;
        const incidentId = action.body.case_id;
        yield put({type: COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS, incidentId, totalComment});
        yield call(delay, 200);
        yield put({type: COMMENT_SCREEN_INITIALIZE_VALUE});
        let body = {
            'id': action.body.case_id
        };
        let parameter = {
            'page': 1
        };
        yield put({type: COMMENT_SCREEN_ALL_COMMENT, body, parameter});
    } catch (error) {
        yield put({type: COMMENT_SCREEN_ADD_NEW_COMMENT_FAILURE});
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

export const commentScreenSaga = [
    takeEvery(COMMENT_SCREEN_ALL_COMMENT, callGetAllCommentApi),
    takeEvery(COMMENT_SCREEN_ADD_NEW_COMMENT, callAddNewCommentApi)
];