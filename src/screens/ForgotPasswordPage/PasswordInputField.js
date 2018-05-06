import React, {Component} from 'react';
import {
    View,
    TextInput
} from 'react-native';

import color from '../../constants/Color';
import AppText from '../../constants/AppText';
import UserConstant from '../../constants/UserConstant';
import textInputStyle from '../../components/CommonStyle/TextInputStyle';

class PasswordInputField extends Component {
    render() {
        return (
            <View>
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

export default PasswordInputField;