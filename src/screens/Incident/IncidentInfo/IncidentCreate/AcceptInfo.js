import React, {Component} from 'react';
import {
    View,
    TextInput,
    BackHandler,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/CaseInfoStyle';
import textInputStyle from '../../../../components/CommonStyle/TextInputStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import {PREVIOUS_PAGE, NEXT_PAGE, RESET_PAGE} from '../../../../constants/NavigationActionConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import ViolenceModalView from './ViolenceType/ViolenceModalView';
import ModalBox from 'react-native-modalbox';
import dismissKeyBoard from 'dismissKeyboard';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import {isTextInputEmpty} from '../../../../components/Validation/EmptyCheck';
import {showToast} from '../../../../components/AlertView/AlertShow';
import CaseInfoInputFiled from "./CaseInfoInputFiled";
import victimInfoStyle from './styles/VictimInfoStyle';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getYYYYMMDDWithTime} from '../../../../components/DateFormat/FormattedDate';
import {setIncidentInfo, setEtaErt, callSetEtaErtApi} from '../../actions/IncidentCreateAction';

class AcceptInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isIncidentDateVisible: false,
            eta: new Date()
        }
    }

    render() {

        return (
            <View style={[style.rootStyle, {paddingBottom: 16}]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>
                       
                         <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressIncidentDate()}>
                            <View style={victimInfoStyle.dropDownRootStyle}>
                                <Text style={victimInfoStyle.dropDownTextStyle}>
                                    {AppText.ETA} : {getYYYYMMDDWithTime(this.state.eta)}
                                </Text>
                                <View style={victimInfoStyle.dropDownIconViewStyle}>
                                    <MaterialCommunityIcons name="calendar-clock"
                                                            size={size.TOOLBAR_ICON_SIZE}
                                                            color={color.DARK_GRAY}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={textInputStyle.fullWidthTextInputRootStyle}>
                            <TextInput
                                style={textInputStyle.fullWidthTextInputStyle}
                                ref='ERT'
                                placeholder={AppText.ERT}
                                underlineColorAndroid="transparent"
                                selectionColor={color.DARK_GRAY}
                                autoCorrect={false}
                                onChangeText={(text) => this.props.setEtaErt(IncidentCreateInfo.ERT, text)}
                                //onSubmitEditing={() => this.focusNextField('CaseDetail')}
                                returnKeyType='next'
                                placeholderTextColor={color.DARK_GRAY}/>
                        </View>

                        <CustomButton pressButton={this.pressSubmit.bind(this)}
                                      title={AppText.SAVE_ETA_ERT.toUpperCase()}/>
                    </View>
                </ScrollView>

                <DateTimePicker
                    mode='datetime' 
                    date={this.state.eta}
                    isVisible={this.state.isIncidentDateVisible}
                    onConfirm={this._handleIncidentDatePicked}
                    onCancel={this._hideIncidentDateTimePicker}/>

            </View>
        );
    }

    pressSubmit() {
       
        this.props.callSetEtaErtApi(this.getEtaErt());
    }

    getEtaErt() {
        let infoList = [];

        infoList.push(this.getFieldObject('eta', getYYYYMMDDWithTime(this.props.incidentCreateReducer.eta)));
        infoList.push(this.getFieldObject('ert', this.props.incidentCreateReducer.ert));
        infoList.push(this.getFieldObject('ticket_id', this.props.incidentCreateReducer.ticket_id));
        
        

        return infoList;
    }

    getFieldObject(key, value) {
        return {
            'name': key,
            'data': String(value)
        };
    }

    nextButtonPress() {
        if (isTextInputEmpty(this.props.incidentCreateReducer.caseName)) {
            showToast(AppText.CASE_NAME_EMPTY_MESSAGE)
        } else if (isTextInputEmpty(this.props.incidentCreateReducer.caseDetails)) {
            showToast(AppText.CASE_DETAILS_EMPTY_MESSAGE);
        } else if (this.props.incidentCreateReducer.violenceTitle === IncidentCreateInfo.SELECT_VIOLENCE_TYPE) {
            showToast(AppText.SELECT_VIOLENCE_TYPE);
        } else {
            dismissKeyBoard();
            this.props.setIncidentInfo(IncidentCreateInfo.CASE_DATE, this.state.incidentDate);
            this.props.goToNextPage('IncidentAttachmentInfo');
        }
    }

    _hideIncidentDateTimePicker = () => this.setState({isIncidentDateVisible: false});

    _handleIncidentDatePicked = (date) => {
        this.setState({
            eta: date
        }, this._hideIncidentDateTimePicker.bind(this));
        this.props.setEtaErt(IncidentCreateInfo.ETA, date);
        this.props.setEtaErt(IncidentCreateInfo.TICKET_ID, this.props.dashboardScreenReducer.mostRecentCase[0].id);
    };

    pressIncidentDate() {
        this.setState({isIncidentDateVisible: true});
    }

    pressViolence() {
        dismissKeyBoard();
        this.setState({
            isViolencePopUpVisible: true
        })
    }

    closeViolencePopUp() {
        this.setState({
            isViolencePopUpVisible: false
        })
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        this.props.backToPreviousPage();
        return true;
    };
}

function mapStateToProps(state) {
    return {
        nav: state,
        dashboardScreenReducer: state.dashboardScreenReducer,
        incidentCreateReducer: state.incidentCreateReducer,
        incidentListScreenReducer: state.incidentListScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        setEtaErt: (key, value) => dispatch(setEtaErt(key, value)),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        callSetEtaErtApi: (body) => dispatch(callSetEtaErtApi(body))
    }
}

AcceptInfo.navigationOptions = {
    title: AppText.TICKET_UPDATE,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptInfo);