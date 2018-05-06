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
import PasswordInputField from "./PasswordInputField";
import UserConstant from '../../constants/UserConstant';
import {callPasswordChangeApi} from './actions/ForgotPasswordAction';
import CustomIndicator from '../../components/CustomIndicator';

class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: ''
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
                                {AppText.PASSWORD} ?
                            </Text>
                        </View>

                        <PasswordInputField setInfo={this.setInfo.bind(this)}/>

                        <CustomButton pressButton={this.nextButtonPress.bind(this)} title={AppText.NEXT.toUpperCase()}/>

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

    setInfo(type, value) {
        switch (type) {
            case UserConstant.NEW_PASSWORD:
                this.setState({newPassword: value});
                break;
            case UserConstant.CONFIRM_PASSWORD:
                this.setState({confirmPassword: value});
                break;
            default:
                break;
        }
    }

    loginClick() {
        this.props.resetPage('LoginScreen');
    }

    nextButtonPress() {
        if (isTextInputEmpty(this.state.newPassword)) {
            showToast(AppText.NEW_PASSWORD_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.state.confirmPassword)) {
            showToast(AppText.CONFIRM_PASSWORD_EMPTY_MESSAGE);
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            showToast(AppText.PASSWORD_NOT_MATCHED_ERROR_MESSAGE);
        } else {
            dismissKeyBoard();
            let body = {
                "password": this.state.newPassword,
                "password_confirmation": this.state.confirmPassword,
                "phone": this.props.forgotPasswordScreenReducer.phoneNumber,
                "key_token": this.props.forgotPasswordScreenReducer.keyToken
            };
            this.props.callPasswordChangeApi(body);
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

ForgotPasswordScreen.navigationOptions = {
    title: AppText.PASSWORD,
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
        callPasswordChangeApi: (body) => dispatch(callPasswordChangeApi(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);