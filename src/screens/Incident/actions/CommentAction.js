import {
    COMMENT_SCREEN_ALL_COMMENT,
    COMMENT_SCREEN_INITIALIZE_VALUE,
    COMMENT_SCREEN_ADD_NEW_COMMENT
} from '../constants/CommentConstant';

export function getAllCommentData(body, parameter) {
    return {
        type: COMMENT_SCREEN_ALL_COMMENT,
        body,
        parameter
    }
}

export function initializeAllValue() {
    return {
        type: COMMENT_SCREEN_INITIALIZE_VALUE
    }
}

export function addNewComment(body) {
    return {
        type: COMMENT_SCREEN_ADD_NEW_COMMENT,
        body
    }
}