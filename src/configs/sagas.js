import {all} from 'redux-saga/effects';
import {loginScreenSaga} from '../screens/LoginPage/sagas/LoginSaga';
import {dashboardScreenSaga} from '../screens/Incident/sagas/DashboardSaga';
import {incidentListScreenSaga} from '../screens/Incident/sagas/IncidentListSaga';
import {commentScreenSaga} from '../screens/Incident/sagas/CommentSaga';
import {incidentCreateScreenSaga} from '../screens/Incident/sagas/IncidentCreateSaga';
import {changePasswordScreenSaga} from '../screens/ChangePasswordPage/sagas/ChangePasswordSaga';
import {updateProfileScreenSaga} from '../screens/UpdateProfilePage/sagas/UpdateProfileSaga';
import {forgotPasswordScreenSaga} from '../screens/ForgotPasswordPage/sagas/ForgotPasswordSaga';
import {userSettingScreenSaga} from '../screens/UserSettingPage/sagas/UserSettingSaga';

export default function* rootSaga() {
    yield all([
        ...loginScreenSaga,
        ...dashboardScreenSaga,
        ...incidentListScreenSaga,
        ...commentScreenSaga,
        ...incidentCreateScreenSaga,
        ...changePasswordScreenSaga,
        ...updateProfileScreenSaga,
        ...forgotPasswordScreenSaga,
        ...userSettingScreenSaga
    ])
}