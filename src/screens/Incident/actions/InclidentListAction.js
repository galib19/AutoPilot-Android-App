import {
    INCIDENT_LIST_SCREEN_ALL_CASE,
    INCIDENT_LIST_SCREEN_INITIALIZE_VALUE,
    INCIDENT_LIST_SCREEN_UPDATE_INCIDENT_OBJECT
} from '../constants/IncidentListConstant';

export function getAllIncident(parameter) {
    return {
        type: INCIDENT_LIST_SCREEN_ALL_CASE,
        parameter
    }
}

export function initializeValue() {
    return {
        type: INCIDENT_LIST_SCREEN_INITIALIZE_VALUE
    }
}

export function updateIncidentObjectForIncidentList(rowData) {
    return {
        type: INCIDENT_LIST_SCREEN_UPDATE_INCIDENT_OBJECT,
        rowData
    }
}