import React from 'react';
import {
    Text,
    View
} from 'react-native';

import styles from './styles/VictimPersonalInfoStyle';
import PropTypes from 'prop-types';

const VictimPersonalInfo = (props) => (
    <Text>
        <Text style={styles.labelStyle}>{props.label}: </Text>
        <Text style={styles.valueStyle}>{props.value} </Text>
    </Text>
);

VictimPersonalInfo.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default VictimPersonalInfo;