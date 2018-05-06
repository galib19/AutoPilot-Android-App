import {combineReducers} from "redux";
import nav from './NavReducer';
import incidentCreateReducer from '../../screens/Incident/reducers/IncidentCreateReducer';
import loginScreenReducer from '../../screens/LoginPage/reducers/LoginReducer';
import dashboardScreenReducer from '../../screens/Incident/reducers/DashboardReducer';
import incidentListScreenReducer from '../../screens/Incident/reducers/IncidentListReducer';
import commentScreenReducer from '../../screens/Incident/reducers/CommentReducer';
import changePasswordScreenReducer from '../../screens/ChangePasswordPage/reducers/ChangePasswordReducer';
import updateProfileScreenReducer from '../../screens/UpdateProfilePage/reducers/UpdateProfileReducer';
import forgotPasswordScreenReducer from '../../screens/ForgotPasswordPage/reducers/ForgotPasswordReducer';
import userSettingScreenReducer from '../../screens/UserSettingPage/reducers/UserSettingReducer';

const AppReducer = combineReducers({
    nav,
    incidentCreateReducer,
    loginScreenReducer,
    dashboardScreenReducer,
    incidentListScreenReducer,
    commentScreenReducer,
    changePasswordScreenReducer,
    updateProfileScreenReducer,
    forgotPasswordScreenReducer,
    userSettingScreenReducer
});

export default AppReducer;