import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import styles from './styles/SignOutPopupStyle';
import AppText from '../../constants/AppText';
import color from '../../constants/Color';
import PropTypes from 'prop-types';

class SignOutPopUpView extends Component {
    render() {
        return (
            <View style={styles.rootStyle}>
                <Text style={styles.logoutTextStyle}>{AppText.LOG_OUT_LABEL}</Text>
                <Text style={styles.logoutWarningTextStyle}>{AppText.LOG_OUT_WARNING}</Text>
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={styles.buttonViewStyle}
                    onPress={() => this.props.logOut()}>
                    <Text style={styles.buttonTextStyle}>{AppText.LOG_OUT_LABEL.toUpperCase()}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={styles.cancelViewStyle}
                    onPress={() => this.props.closeModal()}>
                    <Text style={styles.cancelTextStyle}>{AppText.CANCEL_BUTTON}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

SignOutPopUpView.propTypes = {
    logOut: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default SignOutPopUpView;