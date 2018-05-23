import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    AsyncStorage
} from 'react-native';

import style from './styles/UserInfoStyle';
import AsyncStorageConstant from '../../../constants/AsyncStorageConstant';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userImage: '',
            userDesignation: ''
        }
    }

    render() {
        let userImageView;
        let imageUrl = this.state.userImage;
        if (imageUrl !== null && imageUrl.length > 0) {
            userImageView =
                <Image source={{uri: imageUrl}}
                       style={style.imageStyle}
                       resizeMode={Image.resizeMode.cover}/>
        } else {
            userImageView =
                <Text style={style.profileImageNameStyle}>
                    {this.state.userName.charAt(0).toUpperCase()}
                </Text>
        }

        return (
            <View style={style.rootStyle}>
                <View style={style.innerViewRootStyle}>
                    <View style={style.infoRootStyle}>
                        <Text style={style.nameTextStyle}>{this.state.userName}</Text>
                        <Text style={style.designationTextStyle}>Engineer</Text>
                    </View>
                    {/* <View style={style.imageCircleViewStyle}>
                        {userImageView}
                    </View> */}
                </View>
            </View>

        );
    }

    componentDidMount() {
        AsyncStorage.getItem(AsyncStorageConstant.LOGIN_USER_DATA).then((value) => {
            if (value) {
                let data = JSON.parse(value);
                let userImageUrl = '';
                if (data.profile_pic && data.profile_pic !== null && data.profile_pic.length > 0) {
                    userImageUrl = data.profile_pic;
                }

                this.setState({
                    userName: data.name,
                    userDesignation: data.designation,
                    userImage: userImageUrl
                })
            }
        });
    }
}

export default UserInfo;