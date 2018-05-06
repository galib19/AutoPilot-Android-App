import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles/AttachmentRowStyle';
import color from '../../../../constants/Color'
import {checkFileExtension} from '../../../../components/Validation/FileExtensionCheck';
import {openUrlInBrowser} from '../../../../components/WebBrowser/WebBrowserOpen';

class AttachmentRowData extends Component {
    render() {
        return (
            <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                              onPress={() => this.pressOnAttachment(this.props.data.Url)}>
                <View style={[styles.attachmentRootStyle, {
                    width: (Dimensions.get('window').width - this.props.attachmentSize ) / 5,
                    height: (Dimensions.get('window').width - this.props.attachmentSize ) / 5
                }]}>
                    <Text style={styles.attachmentTextStyle}>{this.getFileExtension(this.props.data.Url)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    getFileExtension(url) {
        let extension = url.substr(url.lastIndexOf('.') + 1);
        if (checkFileExtension(url)) {
            return extension.toUpperCase();
        }
        return '';
    }

    pressOnAttachment(url) {
        openUrlInBrowser(url);
    }
}

export default AttachmentRowData;