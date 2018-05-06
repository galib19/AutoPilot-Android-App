import {
    INCIDENT_LIST_SCREEN_ALL_CASE,
    INCIDENT_LIST_SCREEN_ALL_CASE_SUCCESS,
    INCIDENT_LIST_SCREEN_ALL_CASE_FAILURE,
    INCIDENT_LIST_SCREEN_INITIALIZE_VALUE,
    INCIDENT_LIST_SCREEN_UPDATE_INCIDENT_OBJECT
} from '../constants/IncidentListConstant';

import {
    COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS
} from '../constants/CommentConstant';

import SelectedConstant from '../../../constants/SelectedConstant';

const initialState = {
    isFetching: true,
    incidentList: [],
    incidentListCurrentPage: 1,
    incidentListLastPage: 1,
    incidentObject: {}
};

export default function incidentListScreenReducer(state = initialState, action) {
    switch (action.type) {
        case INCIDENT_LIST_SCREEN_ALL_CASE:
            return {
                ...state,
                incidentObject: {}
            };
        case INCIDENT_LIST_SCREEN_ALL_CASE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                incidentList: state.incidentList.concat(action.result.data),
                incidentListCurrentPage: action.result.current_page,
                incidentListLastPage: action.result.last_page
            };
        case INCIDENT_LIST_SCREEN_ALL_CASE_FAILURE:
            return {
                ...state,
                isFetching: false,
                incidentObject: {}
            };
        case INCIDENT_LIST_SCREEN_INITIALIZE_VALUE:
            return {
                ...state,
                isFetching: true,
                incidentList: [],
                incidentListCurrentPage: 1,
                incidentListLastPage: 1,
                incidentObject: {}
            };
        case INCIDENT_LIST_SCREEN_UPDATE_INCIDENT_OBJECT:
            return {
                ...state,
                incidentObject: action.rowData
            };
        case COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS:
            return {
                ...state,
                incidentList: state.incidentList.map((incident, index) => incident.id === action.incidentId ?
                    {
                        ...incident,
                        [SelectedConstant.TOTAL_COMMENT]: action.totalComment
                    } : incident),
                incidentObject: state.incidentObject.id === action.incidentId ? {
                    ...state.incidentObject,
                    [SelectedConstant.TOTAL_COMMENT]: action.totalComment
                } : state.incidentObject
            };
        default:
            return state;
    }
}