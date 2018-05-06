import React, {Component} from 'react';
import {
    View,
    BackHandler,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    FlatList
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/IncidentAttachmentInfoStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import {PREVIOUS_PAGE, NEXT_PAGE} from '../../../../constants/NavigationActionConstant';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import {checkFileExtension} from '../../../../components/Validation/FileExtensionCheck';
import FileConstant from '../../../../constants/FileConstant';
import {
    addFileToIncidentList,
    addPhotoToIncidentList,
    deleteFileFromIncidentList,
    deletePhotoFromIncidentList,
    initialAttachmentPageInfo
} from '../../actions/IncidentCreateAction';
import FileRowData from "./FileRowData";
let ImagePicker = require('react-native-image-picker');
import {showAlertWithCallback} from '../../../../components/AlertView/AlertShow';

class IncidentAttachmentInfo extends Component {
    constructor(props) {
        super(props);
        this.photoCount = 0;
        this.fileCount = 0;
    }

    render() {
        let fileView;
        let photoView;

        if (this.props.incidentCreateReducer.fileList.length > 0) {
            fileView =
                <View style={style.defaultTopMargin}>
                    <Text style={style.fileLabelStyle}>
                        {this.props.incidentCreateReducer.fileList.length} {AppText.ATTACHMENT}
                    </Text>

                    <FlatList
                        data={this.props.incidentCreateReducer.fileList}
                        renderItem={({item}) => (
                            <FileRowData data={item}
                                         longPress={this.longPressOnFile.bind(this)}/>
                        )}
                        numColumns={5}
                        columnWrapperStyle={style.fileColumnStyle}
                        keyExtractor={item => item.id}/>
                </View>

        } else {
            fileView = null;
        }

        if (this.props.incidentCreateReducer.photoList.length > 0) {
            photoView =
                <View style={style.defaultTopMargin}>
                    <Text style={style.fileLabelStyle}>
                        {this.props.incidentCreateReducer.photoList.length} {AppText.PHOTO}
                    </Text>

                    <FlatList
                        data={this.props.incidentCreateReducer.photoList}
                        renderItem={({item}) => (
                            <FileRowData data={item}
                                         longPress={this.longPressOnPhoto.bind(this)}/>
                        )}
                        numColumns={5}
                        columnWrapperStyle={style.fileColumnStyle}
                        keyExtractor={item => item.id}/>
                </View>

        } else {
            photoView = null;
        }

        return (
            <View style={[style.rootStyle, {paddingBottom: 16}]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>

                        <View style={style.uploadViewRootStyle}>
                            <Text style={style.uploadTextStyle}>
                                {AppText.UPLOAD_PHOTO}
                            </Text>
                            <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                              style={style.imageRootStyle}
                                              onPress={() => this.pressUploadPhoto()}>
                                <Image source={require('../../../../assets/IncidentCreate/photo.png')}
                                       style={style.imageStyle}/>
                            </TouchableOpacity>
                        </View>

                        {photoView}

                        <View style={[style.uploadViewRootStyle, style.defaultTopMargin]}>
                            <Text style={style.uploadTextStyle}>
                                {AppText.UPLOAD_FILE}
                            </Text>
                            <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                              style={style.imageRootStyle}
                                              onPress={() => this.pressUploadFile()}>
                                <Image source={require('../../../../assets/IncidentCreate/file.png')}
                                       style={style.imageStyle}/>
                            </TouchableOpacity>
                        </View>

                        {fileView}

                        <CustomButton pressButton={this.nextButtonPress.bind(this)} title={AppText.NEXT.toUpperCase()}/>

                        <Text style={[style.noteStyle, style.defaultTopMargin]}>
                            {AppText.ATTACHMENT_NOT_REQUIRED}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    longPressOnPhoto(rowData) {
        showAlertWithCallback(AppText.DELETE_PHOTO, AppText.DELETE_PHOTO_WARNING, rowData, this.updatePhotoView.bind(this));
    }

    updatePhotoView(data) {
        this.props.deletePhotoFromIncidentList(data);
    }

    longPressOnFile(rowData) {
        showAlertWithCallback(AppText.DELETE_FILE, AppText.DELETE_FILE_WARNING, rowData, this.updateFileView.bind(this));
    }

    updateFileView(data) {
        this.props.deleteFileFromIncidentList(data);
    }

    pressUploadPhoto() {
        let options = {
            title: AppText.SELECT_PICTURE_TEXT,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        setTimeout(() => {
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
                    this.generateListForPhoto(response.path, response.fileName, response.fileSize);
                }
            });
        }, 1000)
    }

    pressUploadFile() {
        setTimeout(() => {
            DocumentPicker.show({
                filetype: [DocumentPickerUtil.allFiles()],
            }, (error, res) => {
                if (error === null) {
                    setTimeout(() => {
                        if (!checkFileExtension(res.fileName)) {
                            alert(AppText.VALID_EXTENSION_MESSAGE)
                        } else {
                            this.generateListForFile(res.uri, res.fileName, res.fileSize);
                        }
                    }, 1000)
                }
            });
        }, 1000)
    }

    nextButtonPress() {
        this.props.goToNextPage('RefereedInfo');
    }

    generateListForPhoto(uri, fileName, fileSize) {
        let photoObject = {
            [FileConstant.ID]: this.photoCount + 1,
            [FileConstant.URI]: uri,
            [FileConstant.FILE_NAME]: fileName,
            [FileConstant.FILE_SIZE]: fileSize
        };
        this.photoCount = this.photoCount + 1;
        this.props.addPhotoToIncidentList(photoObject)
    }

    generateListForFile(uri, fileName, fileSize) {
        let fileObject = {
            [FileConstant.ID]: this.fileCount + 1,
            [FileConstant.URI]: Platform.OS === 'ios' ? decodeURIComponent(uri) : uri,
            [FileConstant.FILE_NAME]: fileName,
            [FileConstant.FILE_SIZE]: fileSize
        };
        this.fileCount = this.fileCount + 1;
        this.props.addFileToIncidentList(fileObject)
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.initialAttachmentPageInfo();
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

function mapStateToProps(state) {
    return {
        nav: state,
        incidentCreateReducer: state.incidentCreateReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        addFileToIncidentList: (fileInfo) => dispatch(addFileToIncidentList(fileInfo)),
        addPhotoToIncidentList: (photoInfo) => dispatch(addPhotoToIncidentList(photoInfo)),
        deleteFileFromIncidentList: (fileInfo) => dispatch(deleteFileFromIncidentList(fileInfo)),
        deletePhotoFromIncidentList: (photoInfo) => dispatch(deletePhotoFromIncidentList(photoInfo)),
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        initialAttachmentPageInfo: () => dispatch(initialAttachmentPageInfo())
    }
}

IncidentAttachmentInfo.navigationOptions = {
    title: AppText.ATTACHMENT_INFO,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentAttachmentInfo);