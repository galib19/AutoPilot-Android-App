import React, {Component} from 'react';
import {
    Text,
    BackHandler,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/ForgotPasswordCommonStyle';
import AppText from '../../constants/AppText';
import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import color from '../../constants/Color';
import {PREVIOUS_PAGE, RESET_PAGE, NEXT_PAGE} from '../../constants/NavigationActionConstant';
import RegexConstant from '../../constants/RegexConstant';
import CustomButton from '../../components/CustomButton/CustomButton';
import {isTextInputEmpty} from '../../components/Validation/EmptyCheck';
import {showToast} from '../../components/AlertView/AlertShow';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import textInputStyle from '../../components/CommonStyle/TextInputStyle';
import headerStyle from '../../components/CommonStyle/HeaderStyle';
import dismissKeyBoard from 'dismissKeyboard';
import {callGetOtpApi} from './actions/ForgotPasswordAction';
import CustomIndicator from '../../components/CustomIndicator';

class PhoneNumberScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ''
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
                                {AppText.FORGOT_PASSWORD} ?
                            </Text>
                        </View>

                        <View style={textInputStyle.fullWidthTextInputRootStyle}>
                            <TextInput
                                style={textInputStyle.fullWidthTextInputStyle}
                                placeholder={AppText.PHONE_NUMBER}
                                keyboardType='phone-pad'
                                underlineColorAndroid='transparent'
                                selectionColor={color.DARK_GRAY}
                                placeholderTextColor={color.DARK_GRAY}
                                onChangeText={(text) => this.setState({phoneNumber: text})}
                                returnKeyType='done'/>
                        </View>

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

    loginClick() {
        this.props.resetPage('LoginScreen');
    }

    nextButtonPress() {
        let pattern = new RegExp(RegexConstant.MOBILE_NUMBER_PATTERN);
        if (isTextInputEmpty(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_EMPTY_MESSAGE);
        } else if (!pattern.test(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_FORMAT_NOT_CORRECT);
        } else {
            dismissKeyBoard();
            let body = {
                "phone": this.state.phoneNumber
            };
            this.props.callGetOtpApi(body, true);
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

PhoneNumberScreen.navigationOptions = {
    title: AppText.FORGOT_PASSWORD,
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
        callGetOtpApi: (body, isGoToNextPage) => dispatch(callGetOtpApi(body, isGoToNextPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberScreen);