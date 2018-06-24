import React from 'react';
import {StackNavigator} from 'react-navigation';

import SplashScreen from '../screens/SplashPage/SplashScreen';
import LoginScreen from '../screens/LoginPage/LoginScreen';
import IncidentDashboard from '../screens/Incident/Dashboard/IncidentDashboard';
import AllIncidentDashboard from '../screens/Incident/IncidentInfo/IncidentList/AllIncidentDashboard';
import IncidentDetailScreen from '../screens/Incident/IncidentInfo/DetailView/IncidentDetailScreen';
import VictimInfo from '../screens/Incident/IncidentInfo/IncidentCreate/VictimInfo';
import AcceptInfo from '../screens/Incident/IncidentInfo/IncidentCreate/AcceptInfo';
import Map from '../screens/Incident/IncidentInfo/IncidentCreate/Map';
import MapDashboard from '../screens/Incident/IncidentInfo/IncidentCreate/MapDashboard';
import CaseInfo from '../screens/Incident/IncidentInfo/IncidentCreate/CaseInfo';
import IncidentAttachmentInfo from '../screens/Incident/IncidentInfo/IncidentCreate/IncidentAttachmentInfo';
import RefereedInfo from '../screens/Incident/IncidentInfo/IncidentCreate/RefereedInfo';
import UserSettingScreen from '../screens/UserSettingPage/UserSettingScreen';
import UpdateProfile from '../screens/UpdateProfilePage/UpdateProfile';
import ChangePassword from '../screens/ChangePasswordPage/ChangePassword';
import PhoneNumberScreen from '../screens/ForgotPasswordPage/PhoneNumberScreen';
import ForgotPasswordOtpScreen from '../screens/ForgotPasswordPage/ForgotPasswordOtpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordPage/ForgotPasswordScreen';

const AppNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    LoginScreen: {
        screen: LoginScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    IncidentDashboard: {
        screen: IncidentDashboard, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    AllIncidentDashboard: {
        screen: AllIncidentDashboard, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    IncidentDetailScreen: {
        screen: IncidentDetailScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    VictimInfo: {
        screen: VictimInfo, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    CaseInfo: {
        screen: CaseInfo, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    IncidentAttachmentInfo: {
        screen: IncidentAttachmentInfo, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    RefereedInfo: {
        screen: RefereedInfo, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    AcceptInfo: {
        screen: AcceptInfo, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    Map: {
        screen: Map, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    MapDashboard: {
        screen: MapDashboard, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    UserSettingScreen: {
        screen: UserSettingScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    UpdateProfile: {
        screen: UpdateProfile, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    ChangePassword: {
        screen: ChangePassword, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    PhoneNumberScreen: {
        screen: PhoneNumberScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    ForgotPasswordOtpScreen: {
        screen: ForgotPasswordOtpScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    }
});

export default AppNavigator;