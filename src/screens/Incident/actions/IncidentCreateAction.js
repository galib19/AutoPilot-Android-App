import {
    INCIDENT_CREATE_SELECT_GENDER,
    INCIDENT_CREATE_SELECT_VIOLENCE_TYPE,
    INCIDENT_CREATE_ADD_FILE,
    INCIDENT_CREATE_ADD_PHOTO,
    INCIDENT_CREATE_DELETE_PHOTO,
    INCIDENT_CREATE_DELETE_FILE,
    INCIDENT_CREATE_UPDATE_REFEREED_CHECKBOX,
    INCIDENT_CREATE_INITIAL_CREATE_INFO,
    INCIDENT_CREATE_INITIAL_ATTACHMENT_PAGE_INFO,
    INCIDENT_CREATE_GET_SETTING,
    INCIDENT_CREATE_SET_INCIDENT_INFO,
    INCIDENT_CREATE_NEW_INCIDENT
} from '../constants/IncidentCreateConstant';

export function selectGenderFromIncidentCreate(selectedGender) {
    return {
        type: INCIDENT_CREATE_SELECT_GENDER,
        selectedGender
    }
}

export function selectViolenceTypeFromIncidentCreate(selectedViolence) {
    return {
        type: INCIDENT_CREATE_SELECT_VIOLENCE_TYPE,
        selectedViolence
    }
}

export function addFileToIncidentList(fileInfo) {
    return {
        type: INCIDENT_CREATE_ADD_FILE,
        fileInfo
    }
}

export function addPhotoToIncidentList(photoInfo) {
    return {
        type: INCIDENT_CREATE_ADD_PHOTO,
        photoInfo
    }
}

export function deleteFileFromIncidentList(fileInfo) {
    return {
        type: INCIDENT_CREATE_DELETE_FILE,
        fileInfo
    }
}

export function deletePhotoFromIncidentList(photoInfo) {
    return {
        type: INCIDENT_CREATE_DELETE_PHOTO,
        photoInfo
    }
}

export function updateRefereedBox(refereedData) {
    return {
        type: INCIDENT_CREATE_UPDATE_REFEREED_CHECKBOX,
        refereedData
    }
}

export function initialCreateInfo() {
    return {
        type: INCIDENT_CREATE_INITIAL_CREATE_INFO
    }
}

export function initialAttachmentPageInfo() {
    return {
        type: INCIDENT_CREATE_INITIAL_ATTACHMENT_PAGE_INFO
    }
}

export function getAllSettingApi() {
    return {
        type: INCIDENT_CREATE_GET_SETTING
    }
}

export function setIncidentInfo(key, value) {
    return {
        type: INCIDENT_CREATE_SET_INCIDENT_INFO,
        key,
        value
    }
}

export function callIncidentCreateApi(body) {
    return {
        type: INCIDENT_CREATE_NEW_INCIDENT,
        body
    }
}