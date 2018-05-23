import React, {Component} from 'react';
import {
    Text,
    BackHandler,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    AsyncStorage
} from 'react-native';

import {connect} from 'react-redux';
import styles from './styles/UserSettingScreenStyle';
import AppText from '../../constants/AppText';
import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import color from '../../constants/Color';
import ModalBox from 'react-native-modalbox';
import SignOutPopUpView from './SignOutPopUpView';
import {RESET_PAGE, PREVIOUS_PAGE, NEXT_PAGE} from '../../constants/NavigationActionConstant';
import AsyncStorageConstant from '../../constants/AsyncStorageConstant';
import CustomIndicator from '../../components/CustomIndicator';
import {callLogoutApi} from './actions/UserSettingAction';

class UserSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignOutModalVisible: false,
            userName: '',
            userImage: '',
            userDesignation: ''
        }
    }

    render() {
        let profileImageView;
        let signOutModalView;
        let imageUrl = this.state.userImage;
        if (imageUrl !== null && imageUrl.length > 0) {
            profileImageView =
                <View style={styles.imageCircleViewStyle}>
                    <Image source={{uri: imageUrl}}
                           style={styles.imageStyle}
                           resizeMode={Image.resizeMode.cover}/>
                </View>
        } else {
            profileImageView =
                <View style={styles.imageCircleViewStyle}>
                    <Text style={styles.profileImageNameStyle}>{this.state.userName.charAt(0)}</Text>
                </View>
        }

        if (this.state.isSignOutModalVisible) {
            signOutModalView =
                <Modal visible={true} transparent={true}
                       onRequestClose={() => this.closeSignOutModal()}>

                    <ModalBox position={"center"}
                              isOpen={true}
                              onClosed={() => this.closeSignOutModal()}
                              animationDuration={200}
                              style={[styles.signOutPopupStyle, {width: Dimensions.get('window').width * 0.90}]}>

                        <SignOutPopUpView closeModal={this.closeSignOutModal.bind(this)}
                                          logOut={this.pressLogoutFromPopUp.bind(this)}/>
                    </ModalBox>
                </Modal>
        } else {
            signOutModalView = null;
        }
        return (
            <View style={styles.rootStyle}>
                <ScrollView style={styles.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={[styles.rootStyle, {padding: 16}]}>
                        <View style={styles.profileInfoRootStyle}>
                            {/* {profileImageView} */}
                            <View style={styles.rightRootStyle}>
                                <Text style={styles.nameTextStyle}>{this.state.userName}</Text>
                                <Text style={styles.designationTextStyle}>Engineer</Text>
                            </View>
                        </View>

                        <Text style={styles.settingTopLabelStyle}>{AppText.ACCOUNT_SETTING_LABEL.toUpperCase()}</Text>

                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressUpdateProfile()}>
                            <View style={styles.settingRootStyle}>
                                <View style={styles.settingImageRootStyle}>
                                    <Image source={require('../../assets/SettingScreen/edit_profile.png')}
                                           style={styles.settingImageStyle}/>
                                </View>
                                <Text style={styles.settingTextStyle}>{AppText.EDIT_PROFILE_LABEL}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressChangePassword()}>
                            <View style={styles.settingRootStyle}>
                                <View style={styles.settingImageRootStyle}>
                                    <Image source={require('../../assets/SettingScreen/change_password.png')}
                                           style={styles.settingImageStyle}/>
                                </View>
                                <Text style={styles.settingTextStyle}>{AppText.CHANGE_PASSWORD}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.pressSignOut()}>
                            <View style={styles.settingRootStyle}>
                                <View style={styles.settingImageRootStyle}>
                                    <Image source={require('../../assets/SettingScreen/sign_out.png')}
                                           style={styles.settingImageStyle}/>
                                </View>
                                <Text style={styles.settingTextStyle}>{AppText.LOG_OUT_LABEL}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {signOutModalView}

                <CustomIndicator isVisible={this.props.userSettingScreenReducer.isFetching}/>

            </View>
        );
    }

    pressChangePassword() {
        this.props.goToNextPage('ChangePassword');
    }

    pressUpdateProfile() {
        this.props.goToNextPage('UpdateProfile');
    }


    closeSignOutModal() {
        this.setState({
            isSignOutModalVisible: false
        })
    }

    pressSignOut() {
        this.setState({
            isSignOutModalVisible: true
        })
    }

    pressLogoutFromPopUp() {
        this.setState({
            isSignOutModalVisible: false
        }, this.logoutApi.bind(this));

    }

    logoutApi() {
        this.props.callLogoutApi();
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
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

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        this.props.backToPreviousPage();
        return true;
    };
}

UserSettingScreen.navigationOptions = {
    title: AppText.SETTINGS,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

function mapStateToProps(state) {
    return {
        nav: state,
        userSettingScreenReducer: state.userSettingScreenReducer
    }
}


function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        callLogoutApi: () => dispatch(callLogoutApi())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingScreen);