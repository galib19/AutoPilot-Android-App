import React, {Component} from 'react';
import {
    View,
    TextInput
} from 'react-native';

import color from '../../constants/Color';
import style from './styles/OtpInputStyle';
import OTPConstant from '../../constants/OTPConstant';

class OtpInputField extends Component {
    render() {
        return (
            <View style={style.rootStyle}>
                <TextInput
                    ref="NumberOne"
                    style={style.textInputStyle}
                    maxLength={1}
                    underlineColorAndroid='transparent'
                    selectionColor={color.DARK_GRAY}
                    placeholderTextColor={color.DARK_GRAY}
                    keyboardType='numeric'
                    autoCorrect={false}
                    returnKeyType="next"
                    onChangeText={(input) => {
                        if (input.length > 0) {
                            this.refs.NumberTwo.focus();
                        }
                        this.props.setInfo(OTPConstant.NUMBER_ONE, input)
                    }}
                    onSubmitEditing={() => this.refs.NumberTwo.focus()}/>
                <TextInput
                    ref="NumberTwo"
                    style={style.textInputStyle}
                    maxLength={1}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    selectionColor={color.DARK_GRAY}
                    autoCorrect={false}
                    placeholderTextColor={color.DARK_GRAY}
                    returnKeyType="next"
                    onChangeText={(input) => {
                        if (input.length > 0) {
                            this.refs.NumberThree.focus();
                        } else {
                            this.refs.NumberOne.focus();
                        }
                        this.props.setInfo(OTPConstant.NUMBER_TWO, input)
                    }}
                    onSubmitEditing={() => this.refs.NumberThree.focus()}/>
                <TextInput
                    ref="NumberThree"
                    style={style.textInputStyle}
                    maxLength={1}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    selectionColor={color.DARK_GRAY}
                    autoCorrect={false}
                    placeholderTextColor={color.DARK_GRAY}
                    returnKeyType="next"
                    onChangeText={(input) => {
                        if (input.length > 0) {
                            this.refs.NumberFour.focus();
                        } else {
                            this.refs.NumberTwo.focus();
                        }
                        this.props.setInfo(OTPConstant.NUMBER_THREE, input)
                    }}
                    onSubmitEditing={() => this.refs.NumberFour.focus()}/>
                <TextInput
                    ref="NumberFour"
                    style={style.textInputStyle}
                    maxLength={1}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    selectionColor={color.DARK_GRAY}
                    autoCorrect={false}
                    placeholderTextColor={color.DARK_GRAY}
                    onChangeText={(input) => {
                        if (input.length === 0) {
                            this.refs.NumberThree.focus();
                        }
                        this.props.setInfo(OTPConstant.NUMBER_FOUR, input)
                    }}
                    returnKeyType="done"/>
            </View>
        );
    }
}

export default OtpInputField;