import {
    COMMENT_SCREEN_ALL_COMMENT,
    COMMENT_SCREEN_ALL_COMMENT_SUCCESS,
    COMMENT_SCREEN_ALL_COMMENT_FAILURE,
    COMMENT_SCREEN_INITIALIZE_VALUE,
    COMMENT_SCREEN_ADD_NEW_COMMENT,
    COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS,
    COMMENT_SCREEN_ADD_NEW_COMMENT_FAILURE
} from '../constants/CommentConstant';

const initialState = {
    isFetching: true,
    commentList: [],
    commentListCurrentPage: 1,
    commentListLastPage: 1,
    currentPage: 1
};

export default function commentScreenReducer(state = initialState, action) {
    switch (action.type) {
        case COMMENT_SCREEN_ALL_COMMENT:
            return {
                ...state,
                currentPage: action.parameter.page
            };
        case COMMENT_SCREEN_ALL_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                commentList: state.commentList.concat(action.result.data),
                commentListCurrentPage: action.result.current_page,
                commentListLastPage: action.result.last_page
            };
        case COMMENT_SCREEN_ALL_COMMENT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case COMMENT_SCREEN_INITIALIZE_VALUE:
            return {
                ...state,
                isFetching: true,
                commentList: [],
                commentListCurrentPage: 1,
                commentListLastPage: 1,
                currentPage: 1
            };
        case COMMENT_SCREEN_ADD_NEW_COMMENT:
            return {
                ...state,
                isFetching: true
            };
        case COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case COMMENT_SCREEN_ADD_NEW_COMMENT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}