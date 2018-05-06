import {
    INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE,
    INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY
} from '../constants/DashboardConstant';

export function getMostRecentCaseData() {
    return {
        type: INCIDENT_DASHBOARD_SCREEN_MOST_RECENT_CASE
    }
}

export function callAddDeviceKeyApi(body) {
    return {
        type: INCIDENT_DASHBOARD_SCREEN_ADD_DEVICE_KEY,
        body
    }
}