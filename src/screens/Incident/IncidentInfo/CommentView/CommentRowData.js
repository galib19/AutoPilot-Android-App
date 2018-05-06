import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles/CommentRowDataStyle';
import {getDateMMM, getTime12HourFormat} from '../../../../components/DateFormat/FormattedDate';

class CommentRowData extends Component {
    render() {
        let profileImageView;
        let imageUrl = this.props.data.user_profile_pic;
        if (imageUrl !== null && imageUrl.length > 0) {
            profileImageView =
                <View style={styles.rowDataCircleViewStyle}>
                    <Image source={{uri: imageUrl}}
                           style={styles.imageStyle}
                           resizeMode={Image.resizeMode.cover}/>
                </View>
        } else {
            profileImageView =
                <View style={styles.rowDataCircleViewStyle}>
                    <Text style={styles.profileImageNameStyle}>{this.props.data.user_name.charAt(0)}</Text>
                </View>
        }
        return (
            <View style={styles.rootStyle}>
                {profileImageView}
                <View style={styles.rightRootStyle}>
                    <Text style={styles.nameTextStyle}>{this.props.data.user_name}</Text>
                    <Text style={styles.commentTextStyle}>{this.props.data.comment_content}</Text>
                    <Text style={styles.dateTimeTextStyle}>
                        {getDateMMM(this.props.data.comment_date)} at {getTime12HourFormat(this.props.data.comment_date)}
                    </Text>
                </View>
            </View>
        );
    }

}

export default CommentRowData;