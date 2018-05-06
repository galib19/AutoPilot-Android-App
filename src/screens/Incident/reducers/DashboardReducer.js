import {
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE,
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_SUCCESS,
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_FAILURE
} from '../constants/DashboardConstant';

import {
    COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS
} from '../constants/CommentConstant';

import SelectedConstant from '../../../constants/SelectedConstant';

const initialState = {
    isFetching: false,
    mostRecentCase: []
};

export default function dashboardScreenReducer(state = initialState, action) {
    switch (action.type) {
        case INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE:
            return {
                ...state,
                isFetching: true,
                mostRecentCase: []
            };
        case INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                mostRecentCase: action.result
            };
        case INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE_FAILURE:
            return {
                ...state,
                isFetching: false,
                mostRecentCase: []
            };
        case COMMENT_SCREEN_ADD_NEW_COMMENT_SUCCESS:
            return {
                ...state,
                mostRecentCase: state.mostRecentCase.map((incident, index) => incident.id === action.incidentId ?
                    {
                        ...incident,
                        [SelectedConstant.TOTAL_COMMENT]: action.totalComment
                    } : incident)
            };
        default:
            return state;
    }
}