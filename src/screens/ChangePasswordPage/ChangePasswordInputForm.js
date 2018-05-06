import React, {Component} from 'react';
import {
    View,
    TextInput
} from 'react-native';

import color from '../../constants/Color';
import AppText from '../../constants/AppText';
import UserConstant from '../../constants/UserConstant';
import textInputStyle from '../../components/CommonStyle/TextInputStyle';

class ChangePasswordInputForm extends Component {
    render() {
        return (
            <View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='PhoneNumber'
                        placeholder={AppText.PHONE_NUMBER}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        value={this.props.getInfo(UserConstant.PHONE_NUMBER)}
                        editable={false}
                        onChangeText={(text) => this.props.setInfo(UserConstant.PHONE_NUMBER, text)}
                        onSubmitEditing={() => this.focusNextField('OldPassword')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='OldPassword'
                        placeholder={AppText.OLD_PASSWORD}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text) => this.props.setInfo(UserConstant.OLD_PASSWORD, text)}
                        onSubmitEditing={() => this.focusNextField('NewPassword')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='NewPassword'
                        placeholder={AppText.NEW_PASSWORD}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setInfo(UserConstant.NEW_PASSWORD, text)}
                        onSubmitEditing={() => this.focusNextField('ConfirmPassword')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='ConfirmPassword'
                        placeholder={AppText.CONFIRM_PASSWORD}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setInfo(UserConstant.CONFIRM_PASSWORD, text)}
                        returnKeyType='done'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
            </View>
        );
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }
}

export default ChangePasswordInputForm;