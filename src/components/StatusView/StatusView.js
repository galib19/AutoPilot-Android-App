import React from 'react';
import {
    Text,
    View
} from 'react-native';

import styles from './styles/StatusViewStyle';
import PropTypes from 'prop-types';

const StatusView = (props) => (
    <View style={styles.rootStyle}>
        <View style={[styles.squareBoxStyle, {backgroundColor: props.backgroundColor}]}/>
        <Text style={styles.textStyle}>{props.title}</Text>
    </View>
);

StatusView.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default StatusView;