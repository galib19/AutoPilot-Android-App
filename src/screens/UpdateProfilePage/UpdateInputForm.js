import React, {Component} from 'react';
import {
    View,
    TextInput,
} from 'react-native';

import color from '../../constants/Color';
import AppText from '../../constants/AppText';
import UserConstant from '../../constants/UserConstant';
import textInputStyle from '../../components/CommonStyle/TextInputStyle';

class UpdateInputForm extends Component {
    render() {
        return (
            <View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='Name'
                        placeholder={AppText.NAME}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        value={this.props.getInfo(UserConstant.NAME)}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setInfo(UserConstant.NAME, text)}
                        onSubmitEditing={() => this.focusNextField('PhoneNumber')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='PhoneNumber'
                        placeholder={AppText.PHONE_NUMBER}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        value={this.props.getInfo(UserConstant.PHONE_NUMBER)}
                        editable={false}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.props.setInfo(UserConstant.PHONE_NUMBER, text)}
                        returnKeyType='done'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='Designation'
                        placeholder={AppText.DESIGNATION}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        value={this.props.getInfo(UserConstant.DESIGNATION)}
                        autoCorrect={false}
                        editable={false}
                        onChangeText={(text) => this.props.setInfo(UserConstant.DESIGNATION, text)}
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

export default UpdateInputForm;