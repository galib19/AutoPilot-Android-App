import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import color from '../../constants/Color';
import styles from './Style';
import PropTypes from 'prop-types';

const CustomButton = (props) => (
    <TouchableOpacity
        underlayColor={color.BUTTON_PRESS_COLOR}
        style={styles.buttonViewStyle}
        onPress={() => props.pressButton()}>
        <Text style={styles.buttonTextStyle}>{props.title.toUpperCase()}</Text>
    </TouchableOpacity>
);

CustomButton.propTypes = {
    pressButton: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default CustomButton;