import React from 'react';

import {
    View,
    ActivityIndicator
} from 'react-native';

import styles from './style'
import PropTypes from 'prop-types';

class CustomIndicator extends React.Component {
    render() {
        if (!this.props.isVisible) {
            return (<View style={styles.nocontainer}/>);
        }

        return (
            <View style={styles.container}>
                <View style={[styles.overlay]}>
                    <ActivityIndicator
                        animating={true}
                        color="#0000ff"
                        size="large"
                        style={styles.progressBar}/>
                </View>
            </View>
        );
    }
}

CustomIndicator.propTypes = {
    isVisible: PropTypes.bool.isRequired
};

module.exports = CustomIndicator;