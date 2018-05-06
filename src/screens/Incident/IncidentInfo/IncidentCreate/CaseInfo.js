import React, {Component} from 'react';
import {
    View,
    BackHandler,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/CaseInfoStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import {PREVIOUS_PAGE, NEXT_PAGE} from '../../../../constants/NavigationActionConstant';
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
import {getMMDDYYYY} from '../../../../components/DateFormat/FormattedDate';
import {setIncidentInfo} from '../../actions/IncidentCreateAction';

class CaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViolencePopUpVisible: false,
            isIncidentDateVisible: false,
            incidentDate: new Date()
        }
    }

    render() {
        let violencePopUpView;

        if (this.state.isViolencePopUpVisible) {
            violencePopUpView =
                <Modal visible={true} transparent={true}
                       onRequestClose={() => this.closeViolencePopUp()}>

                    <ModalBox position={"bottom"}
                              isOpen={true}
                              onClosed={() => this.closeViolencePopUp()}
                              animationDuration={200}
                              style={victimInfoStyle.bottomPopUpStyle}>

                        <ViolenceModalView closeViolencePopUp={this.closeViolencePopUp.bind(this)}/>
                    </ModalBox>
                </Modal>

        } else {
            violencePopUpView = null;
        }
        return (
            <View style={[style.rootStyle, {paddingBottom: 16}]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>
                        <CaseInfoInputFiled />

                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressViolence()}>
                            <View style={victimInfoStyle.dropDownRootStyle}>
                                <Text style={victimInfoStyle.dropDownTextStyle}>
                                    {this.props.incidentCreateReducer.violenceTitle}
                                </Text>
                                <View style={victimInfoStyle.dropDownIconViewStyle}>
                                    <MaterialIcons name="arrow-drop-down"
                                                   size={size.TOOLBAR_ICON_SIZE}
                                                   color={color.DARK_GRAY}/>
                                </View>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressIncidentDate()}>
                            <View style={victimInfoStyle.dropDownRootStyle}>
                                <Text style={victimInfoStyle.dropDownTextStyle}>
                                    {getMMDDYYYY(this.state.incidentDate)}
                                </Text>
                                <View style={victimInfoStyle.dropDownIconViewStyle}>
                                    <MaterialCommunityIcons name="calendar"
                                                            size={size.TOOLBAR_ICON_SIZE}
                                                            color={color.DARK_GRAY}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <CustomButton pressButton={this.nextButtonPress.bind(this)} title={AppText.NEXT.toUpperCase()}/>
                    </View>
                </ScrollView>

                {violencePopUpView}

                <DateTimePicker
                    date={this.state.incidentDate}
                    isVisible={this.state.isIncidentDateVisible}
                    onConfirm={this._handleIncidentDatePicked}
                    onCancel={this._hideIncidentDateTimePicker}/>

            </View>
        );
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
            incidentDate: date
        }, this._hideIncidentDateTimePicker.bind(this))
    };

    pressIncidentDate() {
        this.setState({isIncidentDateVisible: true})
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
        incidentCreateReducer: state.incidentCreateReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        setIncidentInfo: (key, value) => dispatch(setIncidentInfo(key, value))
    }
}

CaseInfo.navigationOptions = {
    title: AppText.CASE_INFO,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseInfo);