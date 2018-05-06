import React, {Component} from 'react';
import {
    Text,
    BackHandler,
    View,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/ForgotPasswordCommonStyle';
import AppText from '../../constants/AppText';
import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import color from '../../constants/Color';
import {PREVIOUS_PAGE, RESET_PAGE, NEXT_PAGE} from '../../constants/NavigationActionConstant';
import CustomButton from '../../components/CustomButton/CustomButton';
import {isTextInputEmpty} from '../../components/Validation/EmptyCheck';
import {showToast} from '../../components/AlertView/AlertShow';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import headerStyle from '../../components/CommonStyle/HeaderStyle';
import dismissKeyBoard from 'dismissKeyboard';
import OtpInputField from "./OtpInputField";
import OTPConstant from '../../constants/OTPConstant';
import {callGetOtpApi, calCheckOtpApi} from './actions/ForgotPasswordAction';
import CustomIndicator from '../../components/CustomIndicator';

class ForgotPasswordOtpScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOne: '',
            numberTwo: '',
            numberThree: '',
            numberFour: ''
        }
    }

    render() {
        let keyBoardSpacer;
        if (Platform.OS === 'ios') {
            keyBoardSpacer = <KeyboardSpacer/>;
        } else {
            keyBoardSpacer = null;
        }
        return (
            <View style={style.rootStyle}>
                <ScrollView style={style.rootStyle}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={{flexGrow: 1}}>
                    <View style={style.innerViewRootStyle}>
                        <View style={headerStyle.headerViewWithoutSubViewStyle}>
                            <Text style={headerStyle.headerTextStyle}>
                                {AppText.OTP} ?
                            </Text>
                        </View>

                        <OtpInputField setInfo={this.setInfo.bind(this)}/>

                        <CustomButton pressButton={this.nextButtonPress.bind(this)} title={AppText.NEXT.toUpperCase()}/>

                        <View style={style.resendOtpViewStyle}>
                            <TouchableOpacity onPress={() => this.pressResendOTP()}
                                              underlayColor={color.BUTTON_PRESS_COLOR}>
                                <Text style={style.resendOtpTextStyle}>{AppText.RESEND_OTP_TEXT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View style={style.bottomViewRootStyle}>
                    <Text style={style.bottomTextStyle}>{AppText.ALREADY_ACCOUNT}</Text>
                    <TouchableOpacity onPress={() => this.loginClick()}
                                      underlayColor={color.BUTTON_PRESS_COLOR}>
                        <Text style={[style.bottomTextStyle, {fontWeight: 'bold'}]}> {AppText.LOGIN}</Text>
                    </TouchableOpacity>
                </View>

                {keyBoardSpacer}

                <CustomIndicator isVisible={this.props.forgotPasswordScreenReducer.isFetching}/>

            </View>
        );
    }

    pressResendOTP() {
        let body = {
            "phone": this.props.forgotPasswordScreenReducer.phoneNumber
        };
        this.props.callGetOtpApi(body, false);
    }

    setInfo(type, value) {
        switch (type) {
            case OTPConstant.NUMBER_ONE:
                this.setState({numberOne: value});
                break;
            case OTPConstant.NUMBER_TWO:
                this.setState({numberTwo: value});
                break;
            case OTPConstant.NUMBER_THREE:
                this.setState({numberThree: value});
                break;
            case OTPConstant.NUMBER_FOUR:
                this.setState({numberFour: value});
                break;
            default:
                break;
        }
    }

    loginClick() {
        this.props.resetPage('LoginScreen');
    }

    nextButtonPress() {
        if (isTextInputEmpty(this.state.numberOne) || isTextInputEmpty(this.state.numberTwo) || isTextInputEmpty(this.state.numberThree) || isTextInputEmpty(this.state.numberFour)) {
            showToast(AppText.FIELD_CAN_NOT_EMPTY_TEXT)
        } else {
            dismissKeyBoard();
            let OTP = this.state.numberOne + this.state.numberTwo + this.state.numberThree + this.state.numberFour;
            let body = {
                "otp": OTP,
                "phone": this.props.forgotPasswordScreenReducer.phoneNumber
            };
            this.props.calCheckOtpApi(body);
        }
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

ForgotPasswordOtpScreen.navigationOptions = {
    title: AppText.OTP,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

function mapStateToProps(state) {
    return {
        nav: state,
        forgotPasswordScreenReducer: state.forgotPasswordScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        callGetOtpApi: (body, isGoToNextPage) => dispatch(callGetOtpApi(body, isGoToNextPage)),
        calCheckOtpApi: (body) => dispatch(calCheckOtpApi(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordOtpScreen);