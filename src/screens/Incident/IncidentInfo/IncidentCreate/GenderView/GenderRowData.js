import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import color from '../../../../../constants/Color';
import styles from '../styles/BottomPopUpStyle';
import SelectedConstant from '../../../../../constants/SelectedConstant';
import FeatherIcon from 'react-native-vector-icons/Feather';
import size from '../../../../../constants/Size';


class GenderRowData extends Component {
    render() {
        let imageView;
        let isSelected = this.props.data[SelectedConstant.SELECTED];
        if (isSelected) {
            imageView = <FeatherIcon name="check" size={size.TOOLBAR_ICON_SIZE} color={color.DARK_GRAY}/>;
        } else {
            imageView = null;
        }

        return (
            <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                              onPress={() => this.props.pressGender(this.props.data)}>
                <View style={styles.rootViewStyle}>
                    <Text style={styles.textStyle}>{this.props.data.title}</Text>
                    <View style={styles.imageViewStyle}>
                        {imageView}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default GenderRowData;