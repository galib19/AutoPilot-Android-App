import React, {Component} from 'react';
import {
    BackHandler,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import AppText from '../../constants/AppText';
import color from '../../constants/Color';
import {connect} from 'react-redux';
import styles from './styles/UpdateProfileStyle';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import dismissKeyBoard from 'dismissKeyboard';
import {isObjectEmpty} from '../../components/Validation/EmptyCheck';
import {RESET_PAGE, PREVIOUS_PAGE} from '../../constants/NavigationActionConstant';
import UpdateInputForm from "./UpdateInputForm";
let ImagePicker = require('react-native-image-picker');
import UserConstant from '../../constants/UserConstant';
import {getStringValue, isTextInputEmpty} from '../../components/Validation/EmptyCheck';
import CustomButton from '../../components/CustomButton/CustomButton';
import RegexConstant from '../../constants/RegexConstant';
import {showToast} from '../../components/AlertView/AlertShow';
import AsyncStorageConstant from '../../constants/AsyncStorageConstant';
import {callUpdateProfileApi} from './actions/UpdateProfileAction';
import ProfileConstant from '../../constants/ProfileConstant';
import RNFetchBlob from 'react-native-fetch-blob';
import CustomIndicator from '../../components/CustomIndicator';

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.profileImageObject = {};
        this.state = {
            profilePicture: {},
            name: '',
            phoneNumber: '',
            designation: ''
        }
    }

    render() {
        let profilePictureImageView;

        let keyBoardSpacer;
        if (Platform.OS === 'ios') {
            keyBoardSpacer = <KeyboardSpacer/>;
        } else {
            keyBoardSpacer = null;
        }

        if (!isObjectEmpty(this.state.profilePicture)) {
            profilePictureImageView =
                <Image source={this.state.profilePicture}
                       style={styles.profilePictureStyle}
                       resizeMode={Image.resizeMode.cover}/>
        } else {
            profilePictureImageView =
                <Image source={require('../../assets/UpdateProfile/Camera.png')}
                       style={styles.emptyProfilePictureStyle}/>
        }

        return (
            <View style={styles.rootStyle}>
                <ScrollView style={styles.rootStyle}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerViewRootStyle}>
                        <View style={styles.profilePictureRootStyle}>
                            <TouchableOpacity onPress={() => this.onImageButtonPress()}
                                              underlayColor={color.BUTTON_PRESS_COLOR}>
                                <View style={styles.imageRootStyle}>
                                    {profilePictureImageView}
                                </View>
                            </TouchableOpacity>
                        </View>

                        <UpdateInputForm setInfo={this.setUserInfoValue.bind(this)}
                                         getInfo={this.getUserInfoValue.bind(this)}/>

                        <CustomButton pressButton={this.onUpdatePress.bind(this)} title={AppText.UPDATE.toUpperCase()}/>

                    </View>
                </ScrollView>

                {keyBoardSpacer}

                <CustomIndicator isVisible={this.props.updateProfileScreenReducer.isFetching}/>

            </View>
        );
    }

    getUserInfoValue(type) {
        switch (type) {
            case UserConstant.NAME:
                return this.state.name;
            case UserConstant.PHONE_NUMBER:
                return this.state.phoneNumber;
            case UserConstant.DESIGNATION:
                return this.state.designation;
            default:
                return "";
        }
    }

    setUserInfoValue(type, value) {
        switch (type) {
            case UserConstant.NAME:
                this.setState({name: value});
                break;
            case UserConstant.PHONE_NUMBER:
                this.setState({phoneNumber: value});
                break;
            case UserConstant.DESIGNATION:
                this.setState({designation: value});
                break;
            default:
                break;
        }
    }

    onImageButtonPress() {
        dismissKeyBoard();
        let options = {
            title: AppText.SELECT_PICTURE_TEXT,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.profileImageObject = response;
                let source = {uri: response.uri};
                this.setState({
                    profilePicture: source
                })
            }
        });
    }

    onUpdatePress() {
        let pattern = new RegExp(RegexConstant.MOBILE_NUMBER_PATTERN);
        if (isTextInputEmpty(this.state.name)) {
            showToast(AppText.USER_NAME_EMPTY_MESSAGE)
        } else if (isTextInputEmpty(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.state.designation)) {
            showToast(AppText.DESIGNATION_EMPTY_MESSAGE);
        } else if (!pattern.test(this.state.phoneNumber)) {
            showToast(AppText.PHONE_NUMBER_FORMAT_NOT_CORRECT);
        } else {
            dismissKeyBoard();
            this.props.callUpdateProfileApi(this.getUpdateInfo());
        }
    }

    getUpdateInfo() {
        let updateInfo = [];
        if (!isObjectEmpty(this.profileImageObject)) {
            let photo = {
                'name': ProfileConstant.FILE_NAME_KEY,
                'filename': this.profileImageObject.fileName,
                'data': RNFetchBlob.wrap(this.profileImageObject.path)
            };
            updateInfo.push(photo);
        }
        updateInfo.push(this.getFieldObject('name', this.state.name));
        updateInfo.push(this.getFieldObject('designation', this.state.designation));
        return updateInfo;
    }

    getFieldObject(key, value) {
        return {
            'name': key,
            'data': String(value)
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        AsyncStorage.getItem(AsyncStorageConstant.LOGIN_USER_DATA).then((value) => {
            if (value) {
                let source;
                let data = JSON.parse(value);
                let image = data.profile_pic;
                if (image && image !== null && image.length > 0) {
                    source = {uri: image};
                } else {
                    source = {};
                }
                this.setState({
                    profilePicture: source,
                    name: getStringValue(data.name),
                    designation: getStringValue(data.designation),
                    phoneNumber: getStringValue(data.phone)
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

UpdateProfile.navigationOptions = {
    title: AppText.UPDATE_PROFILE,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

function mapStateToProps(state) {
    return {
        nav: state,
        updateProfileScreenReducer: state.updateProfileScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        callUpdateProfileApi: (body) => dispatch(callUpdateProfileApi(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
