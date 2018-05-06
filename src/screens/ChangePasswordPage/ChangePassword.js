import React, {Component} from 'react';
import {
    View,
    BackHandler,
    ScrollView,
    AsyncStorage
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/ChangePasswordStyle';
import AppText from '../../constants/AppText';
import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import color from '../../constants/Color';
import {PREVIOUS_PAGE, RESET_PAGE} from '../../constants/NavigationActionConstant';
import RegexConstant from '../../constants/RegexConstant';
import CustomButton from '../../components/CustomButton/CustomButton';
import {isTextInputEmpty} from '../../components/Validation/EmptyCheck';
import {showToast} from '../../components/AlertView/AlertShow';
import ChangePasswordInputForm from "./ChangePasswordInputForm";
import UserConstant from '../../constants/UserConstant';
import dismissKeyBoard from 'dismissKeyboard';
import {callChangePasswordApi} from './actions/ChangePasswordAction';
import AsyncStorageConstant from '../../constants/AsyncStorageConstant';
import CustomIndicator from '../../components/CustomIndicator';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    render() {
        return (
            <View style={[style.rootStyle]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>
                        <ChangePasswordInputForm setInfo={this.setInfo.bind(this)}
                                                 getInfo={this.getInfo.bind(this)}/>
                        <CustomButton pressButton={this.changePasswordPress.bind(this)}
                                      title={AppText.CHANGE_PASSWORD.toUpperCase()}/>
                    </View>
                </ScrollView>

                <CustomIndicator isVisible={this.props.changePasswordScreenReducer.isFetching}/>

            </View>
        );
    }

    changePasswordPress() {
        let pattern = new RegExp(RegexConstant.MOBILE_NUMBER_PATTERN);
        if (isTextInputEmpty(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.state.oldPassword)) {
            showToast(AppText.OLD_PASSWORD_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.state.newPassword)) {
            showToast(AppText.NEW_PASSWORD_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.state.confirmPassword)) {
            showToast(AppText.CONFIRM_PASSWORD_EMPTY_MESSAGE);
        } else if (!pattern.test(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_FORMAT_NOT_CORRECT);
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            showToast(AppText.PASSWORD_NOT_MATCHED_ERROR_MESSAGE);
        } else {
            dismissKeyBoard();
            let body = {
                "phone": this.state.phoneNumber,
                "old_password": this.state.oldPassword,
                "new_password": this.state.newPassword
            };
            this.props.callChangePasswordApi(body);
        }
    }

    setInfo(type, value) {
        switch (type) {
            case UserConstant.PHONE_NUMBER:
                this.setState({phoneNumber: value});
                break;
            case UserConstant.OLD_PASSWORD:
                this.setState({oldPassword: value});
                break;
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

    getInfo(type) {
        switch (type) {
            case UserConstant.PHONE_NUMBER:
                return this.state.phoneNumber;
            default:
                break;
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        AsyncStorage.getItem(AsyncStorageConstant.LOGIN_USER_DATA).then((value) => {
            if (value) {
                let data = JSON.parse(value);
                this.setState({
                    phoneNumber: data.phone
                })
            }
        });
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
        changePasswordScreenReducer: state.changePasswordScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        callChangePasswordApi: (body) => dispatch(callChangePasswordApi(body))
    }
}

ChangePassword.navigationOptions = {
    title: AppText.CHANGE_PASSWORD,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);