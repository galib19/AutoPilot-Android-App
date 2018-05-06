import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import styles from './Style';
import color from '../../constants/Color';

const FooterIndicator = () => (
    <View>
        <View style={styles.viewStyle}>
            <ActivityIndicator
                animating={true}
                color={color.INDICATION_COLOR}
                size='large'/>
        </View>
    </View>
);

export default FooterIndicator;