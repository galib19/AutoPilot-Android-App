import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    AsyncStorage
} from 'react-native';

import {connect} from 'react-redux';
import styles from './styles/LoginScreenStyle';
import AppText from '../../constants/AppText';
import color from '../../constants/Color';
import textInputStyle from '../../components/CommonStyle/TextInputStyle';
import statusBarStyle from '../../components/CommonStyle/StatusBarHeightStyle';
import dismissKeyBoard from 'dismissKeyboard';
import headerStyle from '../../components/CommonStyle/HeaderStyle';
import CustomButton from '../../components/CustomButton/CustomButton';
import {isTextInputEmpty} from '../../components/Validation/EmptyCheck';
import {showToast} from '../../components/AlertView/AlertShow';
import {NEXT_PAGE} from '../../constants/NavigationActionConstant';
import RegexConstant from '../../constants/RegexConstant';
import {callLoginApi} from './actions/LoginAction';
import CustomIndicator from '../../components/CustomIndicator';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.clear();
        this.state = {
            phoneNumber: '',
            password: ''
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
                <View style={[styles.rootStyle, statusBarStyle.statusBarHeightStyle]}>
                    <ScrollView style={styles.rootStyle} keyboardShouldPersistTaps='handled'
                                contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.topViewRootStyle}>
                            <View style={headerStyle.headerViewRootStyle}>
                                <Text style={headerStyle.headerTextStyle}>{AppText.LOGIN}</Text>
                                <Text style={headerStyle.bodyTextStyle}>{AppText.WELCOME}</Text>
                                <Text style={headerStyle.bodyTextStyle}>{AppText.App_NAME}</Text>
                            </View>
                            <View>
                                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                                    <TextInput
                                        style={textInputStyle.fullWidthTextInputStyle}
                                        placeholder={AppText.PHONE_NUMBER}
                                        keyboardType='phone-pad'
                                        underlineColorAndroid='transparent'
                                        selectionColor={color.DARK_GRAY}
                                        placeholderTextColor={color.DARK_GRAY}
                                        onChangeText={(text) => this.setState({phoneNumber: text})}
                                        onSubmitEditing={() => this.focusNextField('Password')}
                                        returnKeyType='next'/>
                                </View>

                                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                                    <TextInput
                                        style={textInputStyle.fullWidthTextInputStyle}
                                        ref='Password'
                                        placeholder={AppText.PASSWORD}
                                        underlineColorAndroid='transparent'
                                        selectionColor={color.DARK_GRAY}
                                        onChangeText={(text) => this.setState({password: text})}
                                        placeholderTextColor={color.DARK_GRAY}
                                        secureTextEntry={true}
                                        returnKeyType='done'/>
                                </View>
                            </View>

                            <CustomButton pressButton={this.loginButtonCLick.bind(this)} title={AppText.LOGIN}/>

                            <View style={styles.forgotPasswordViewStyle}>
                                <TouchableOpacity
                                    onPress={() => this.forgotPasswordClick()}
                                    underlayColor={color.BUTTON_PRESS_COLOR}>
                                    <Text style={styles.forgotPasswordTextStyle}>
                                        {AppText.FORGOT_PASSWORD}?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomViewRootStyle}>
                        <Text style={styles.bottomTextStyle}>{AppText.COMPANY_NAME}</Text>
                    </View>

                    <CustomIndicator isVisible={this.props.loginScreenReducer.isFetching}/>

                </View>
            </KeyboardAvoidingView>
        );
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    loginButtonCLick() {
        let pattern = new RegExp(RegexConstant.MOBILE_NUMBER_PATTERN);
        if (isTextInputEmpty(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_EMPTY_MESSAGE)
        } else if (isTextInputEmpty(this.state.password)) {
            showToast(AppText.PASSWORD_EMPTY_MESSAGE);
        } else if (!pattern.test(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_FORMAT_NOT_CORRECT);
        } else {
            dismissKeyBoard();
            let body = {
                'phone': this.state.phoneNumber,
                'password': this.state.password
            };
            this.props.callLoginApi(body);
        }
    }

    forgotPasswordClick() {
        this.props.goToNextPage('PhoneNumberScreen');
    }
}

function mapStateToProps(state) {
    return {
        nav: state,
        loginScreenReducer: state.loginScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        callLoginApi: (body) => dispatch(callLoginApi(body))
    }
}

LoginScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);