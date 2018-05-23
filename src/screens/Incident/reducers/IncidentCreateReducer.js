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
    INCIDENT_CREATE_GET_SETTING_SUCCESS,
    INCIDENT_CREATE_GET_SETTING_FAILURE,
    INCIDENT_CREATE_SET_INCIDENT_INFO,
    INCIDENT_CREATE_NEW_INCIDENT,
    INCIDENT_CREATE_NEW_INCIDENT_SUCCESS,
    INCIDENT_CREATE_NEW_INCIDENT_FAILURE,
    TICKET_ETA_ERT_SET,
    TICKET_ETA_ERT_SET_API,
    TICKET_ETA_ERT_SET_API_SUCCESS,
    TICKET_ETA_ERT_SET_API_FAILURE,
    TICKET_STATUS,
    TICKET_STATUS_API,
    TICKET_STATUS_API_SUCCESS,
    TICKET_STATUS_API_FAILURE
} from '../constants/IncidentCreateConstant';

import {getGenderList} from '../../../constants/GenderList';
import SelectedConstant from '../../../constants/SelectedConstant';
import IncidentCreateInfo from '../../../constants/IncidentCreateInfo';
import FileConstant from '../../../constants/FileConstant';

const initialState = {
    isFetching: false,
    eta: '', 
    ert: '',
    case_id: '',
    ticket_status: ''
};

export default function incidentCreateReducer(state = initialState, action) {
    switch (action.type) {
        case INCIDENT_CREATE_SELECT_GENDER:
            return {
                ...state,
                genderTitle: action.selectedGender.title,
                genderList: state.genderList.map((gender, index) => gender.id === action.selectedGender.id ?
                    {
                        ...gender,
                        [SelectedConstant.SELECTED]: true
                    } : {
                        ...gender,
                        [SelectedConstant.SELECTED]: false
                    })
            };
        case INCIDENT_CREATE_SELECT_VIOLENCE_TYPE:
            return {
                ...state,
                violenceTitle: action.selectedViolence.name,
                violenceList: state.violenceList.map((violenceType, index) => violenceType.id === action.selectedViolence.id ?
                    {
                        ...violenceType,
                        [SelectedConstant.SELECTED]: true
                    } : {
                        ...violenceType,
                        [SelectedConstant.SELECTED]: false
                    })
            };
        case INCIDENT_CREATE_ADD_FILE:
            return {
                ...state,
                fileList: [...state.fileList, action.fileInfo]
            };
        case INCIDENT_CREATE_ADD_PHOTO:
            return {
                ...state,
                photoList: [...state.photoList, action.photoInfo]
            };
        case INCIDENT_CREATE_DELETE_PHOTO:
            return {
                ...state,
                photoList: state.photoList.filter((item, index) => item[FileConstant.ID] !== action.photoInfo[FileConstant.ID])
            };
        case INCIDENT_CREATE_DELETE_FILE:
            return {
                ...state,
                fileList: state.fileList.filter((item, index) => item[FileConstant.ID] !== action.fileInfo[FileConstant.ID])
            };
        case INCIDENT_CREATE_UPDATE_REFEREED_CHECKBOX:
            return {
                ...state,
                checkBoxList: state.checkBoxList.map((checkBox, index) => checkBox.id === action.refereedData.id ?
                    {
                        ...checkBox,
                        [SelectedConstant.CHECKED]: !checkBox[SelectedConstant.CHECKED]
                    } : checkBox)
            };
        case INCIDENT_CREATE_INITIAL_CREATE_INFO:
            return {
                ...state,
                genderList: getGenderList(),
                genderTitle: IncidentCreateInfo.SELECT_GENDER,
                violenceList: [],
                violenceTitle: IncidentCreateInfo.SELECT_VIOLENCE_TYPE,
                checkBoxList: [],
                victimName: '',
                victimParents: '',
                victimAge: '',
                victimLocation: '',
                caseName: '',
                caseDetails: '',
                caseDate: '',
                eta: '',
                ert: '' 
            };
        case INCIDENT_CREATE_INITIAL_ATTACHMENT_PAGE_INFO:
            return {
                ...state,
                fileList: [],
                photoList: []
            };
        case INCIDENT_CREATE_GET_SETTING:
            return {
                ...state,
                isFetching: true
            };
        case INCIDENT_CREATE_GET_SETTING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                violenceList: getViolenceListWithExtraValue(action.result.violence_type),
                checkBoxList: getCheckboxListWithExtraValue(action.result.action_taken)
            };
        case INCIDENT_CREATE_GET_SETTING_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case INCIDENT_CREATE_SET_INCIDENT_INFO:
            return {
                ...state,
                victimName: action.key === IncidentCreateInfo.VICTIM_NAME ? action.value : state.victimName,
                victimParents: action.key === IncidentCreateInfo.PAR_OR_HUS ? action.value : state.victimParents,
                victimAge: action.key === IncidentCreateInfo.AGE ? action.value : state.victimAge,
                victimLocation: action.key === IncidentCreateInfo.LOCATION ? action.value : state.victimLocation,
                caseName: action.key === IncidentCreateInfo.CASE_NAME ? action.value : state.caseName,
                caseDetails: action.key === IncidentCreateInfo.CASE_DETAILS ? action.value : state.caseDetails,
                caseDate: action.key === IncidentCreateInfo.CASE_DATE ? action.value : state.caseDate
            };
        case INCIDENT_CREATE_NEW_INCIDENT:
            return {
                ...state,
                isFetching: true
            };
        case INCIDENT_CREATE_NEW_INCIDENT_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case INCIDENT_CREATE_NEW_INCIDENT_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case TICKET_ETA_ERT_SET:
        return {
            ...state,
            eta: action.key === IncidentCreateInfo.ETA ? action.value : state.eta,
            ert: action.key === IncidentCreateInfo.ERT ? action.value : state.ert,
            case_id: action.key === IncidentCreateInfo.TICKET_ID ? action.value : state.case_id
            };
        case TICKET_ETA_ERT_SET_API:
            return {
                ...state,
                isFetching: true
            };
            case TICKET_ETA_ERT_SET_API_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case TICKET_ETA_ERT_SET_API_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case TICKET_STATUS:
        return {
            ...state,
            case_id: action.key === IncidentCreateInfo.TICKET_ID ? action.value : state.case_id,
            ticket_status: action.key === IncidentCreateInfo.TICKET_STATUS ? action.value : state.ticket_status
            };
        case TICKET_STATUS_API:
            return {
                ...state,
                isFetching: true
            };
        case TICKET_ETA_ERT_SET_API_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case TICKET_ETA_ERT_SET_API_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        default:
            return state
    }
}

function getViolenceListWithExtraValue(violenceList) {
    let listWithSelectedField = [];
    for (i = 0; i < violenceList.length; i++) {
        let field = violenceList[i];
        field[SelectedConstant.SELECTED] = false;
        listWithSelectedField.push(field);
    }
    return listWithSelectedField;
}

function getCheckboxListWithExtraValue(checkboxList) {
    let listWithSelectedField = [];
    for (i = 0; i < checkboxList.length; i++) {
        let field = checkboxList[i];
        field[SelectedConstant.CHECKED] = false;
        listWithSelectedField.push(field);
    }
    return listWithSelectedField;
}