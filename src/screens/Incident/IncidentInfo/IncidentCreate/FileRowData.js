import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Dimensions} from 'react-native';
import styles from './styles/FileRowStyle';
import FileConstant from '../../../../constants/FileConstant';

const screenWidth = (Dimensions.get('window').width - 50 ) / 5;

class FileRowData extends Component {
    render() {
        let rowData = this.props.data;
        let fileName = rowData[FileConstant.FILE_NAME];
        let extension = fileName.substr(fileName.lastIndexOf('.') + 1);
        return (
            <TouchableWithoutFeedback onLongPress={() => this.props.longPress(this.props.data)}>
                <View style={[styles.rootStyle, {width: screenWidth, height: screenWidth}]}>
                    <Text style={styles.extensionTextStyle}>{extension.toUpperCase()}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default FileRowData;