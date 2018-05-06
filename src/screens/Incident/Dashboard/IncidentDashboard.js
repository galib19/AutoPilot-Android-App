import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/DashboardStyle';
import Toolbar from './Toolbar';
import UserInfo from './UserInfo';
import StatusView from '../../../components/StatusView/StatusView';
import color from '../../../constants/Color';
import Status from '../../../constants/StatusConstant';
import AppText from '../../../constants/AppText';
import IncidentDetailViewForDashboard from '../IncidentInfo/DetailView/IncidentDetailViewForDashboard';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import size from '../../../constants/Size';
import {NEXT_PAGE} from '../../../constants/NavigationActionConstant';
import {getMostRecentCaseData, callAddDeviceKeyApi} from '../actions/DashboardAction';
import CustomIndicator from '../../../components/CustomIndicator';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";

class IncidentDashboard extends Component {
    render() {
        let previousCaseButton = null;
        let caseDetailView = null;
        let emptyView = null;
        let isDataAvailable = this.props.dashboardScreenReducer.mostRecentCase.length > 0;

        if (!isDataAvailable) {
            emptyView =
                <View style={style.emptyViewRootStyle}>
                    <Text style={style.emptyHeaderStyle}>
                        {AppText.YOU_DO_NOT_HAVE_ANY_CASE}
                    </Text>
                    <Text style={style.emptyBodyTextStyle}>
                        {AppText.PLEASE_POST_YOUR_CASE_HERE}
                    </Text>
                    <View style={style.addCaseViewStyle}>
                        <Text style={style.addCaseTextStyle}>
                            {AppText.ADD_CASE}
                        </Text>
                    </View>
                </View>
        } else {
            previousCaseButton =
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={style.previousCaseButtonRootStyle}
                    onPress={() => this.props.goToNextPage('AllIncidentDashboard')}>
                    <Text style={style.previousCaseButtonTextStyle}>{AppText.PREVIOUS_CASE.toUpperCase()}</Text>
                </TouchableOpacity>;
            caseDetailView =
                <View style={style.detailViewRootStyle}>
                    <IncidentDetailViewForDashboard attachmentSize={84}/>
                </View>

        }
        return (
            <View style={style.rootStyle}>
                <Toolbar/>
                <ScrollView style={style.rootStyle}
                            contentContainerStyle={{flexGrow: !isDataAvailable ? 1 : 0}}
                            keyboardShouldPersistTaps='handled'>
                    <View style={style.rootStyle}>
                        <UserInfo/>
                        <View style={style.topViewRootStyle}>
                            <Text style={style.currentCaseTextStyle}>{AppText.LATEST_CASE}</Text>
                            <View style={style.statusViewRootStyle}>
                                <StatusView backgroundColor={color.NEW_STATUS_COLOR} title={Status.NEW}/>
                                <StatusView backgroundColor={color.REVIEW_STATUS_COLOR} title={Status.REVIEWED}/>
                                <StatusView backgroundColor={color.OPEN_STATUS_COLOR} title={Status.OPEN}/>
                                <StatusView backgroundColor={color.APPROVED_STATUS_COLOR} title={Status.APPROVED}/>
                                <StatusView backgroundColor={color.ARCHIVED_STATUS_COLOR} title={Status.ARCHIVED}/>
                                <StatusView backgroundColor={color.CLOSE_STATUS_COLOR} title={Status.CLOSE}/>
                            </View>
                        </View>

                        {emptyView}

                        {caseDetailView}

                        {previousCaseButton}
                    </View>
                </ScrollView>

                <CustomIndicator isVisible={this.props.dashboardScreenReducer.isFetching}/>

                <ActionButton buttonColor={color.PINK}
                              size={size.FLOATING_BUTTON_SIZE}
                              onPress={() => this.props.goToNextPage('VictimInfo')}
                              position={!isDataAvailable ? 'center' : 'right'}
                              offsetY={!isDataAvailable ? 70 : 30}
                              renderIcon={() => <MaterialCommunityIcons name="plus"
                                                                        size={size.FLOATING_BUTTON_ICON_SIZE}
                                                                        color={color.WHITE}/>}>
                </ActionButton>

            </View>
        );
    }

    async componentDidMount() {
        let fireBaseToken = '';
        await FCM.getFCMToken().then(token => {
            fireBaseToken = token;
        });

        await FCM.on(FCMEvent.RefreshToken, token => {
            fireBaseToken = token;
        });
        this.props.getMostRecentCaseData();
        if (fireBaseToken !== null && fireBaseToken.length > 0) {
            let body = {
                "fcm_token": fireBaseToken,
                "device": Platform.OS
            };
            this.props.callAddDeviceKeyApi(body);
        }
    }
}

function mapStateToProps(state) {
    return {
        nav: state,
        dashboardScreenReducer: state.dashboardScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        getMostRecentCaseData: () => dispatch(getMostRecentCaseData()),
        callAddDeviceKeyApi: (body) => dispatch(callAddDeviceKeyApi(body))
    }
}

IncidentDashboard.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDashboard);