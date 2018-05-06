import React, {Component} from 'react';
import {
    View,
    BackHandler,
    Text,
    ScrollView
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/RefereedInfoStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import {RESET_PAGE, PREVIOUS_PAGE} from '../../../../constants/NavigationActionConstant';
import SelectedConstant from '../../../../constants/SelectedConstant';
import CheckBox from 'react-native-check-box';
import {updateRefereedBox} from '../../actions/IncidentCreateAction';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import FileConstant from '../../../../constants/FileConstant';
import RNFetchBlob from 'react-native-fetch-blob';
import {getYYYYMMDDWithTime} from '../../../../components/DateFormat/FormattedDate';
import {callIncidentCreateApi} from '../../actions/IncidentCreateAction';
import CustomIndicator from '../../../../components/CustomIndicator';

class RefereedInfo extends Component {
    render() {
        return (
            <View style={[style.rootStyle]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>
                        <Text style={style.checkBoxTitleStyle}>
                            {AppText.REFEREED_TO}
                        </Text>
                        {this.generateRefereedView()}
                        <CustomButton pressButton={this.pressSubmit.bind(this)}
                                      title={AppText.SUBMIT_FOR_REVIEW.toUpperCase()}/>
                    </View>
                </ScrollView>

                <CustomIndicator isVisible={this.props.incidentCreateReducer.isFetching}/>

            </View>
        );
    }

    pressSubmit() {
        this.props.callIncidentCreateApi(this.getCreateInfo());
    }

    getCreateInfo() {
        let infoList = [];
        let fileList = this.props.incidentCreateReducer.fileList;
        let photoList = this.props.incidentCreateReducer.photoList;
        if (fileList.length > 0) {
            for (i = 0; i < fileList.length; i++) {
                let fileInfo = fileList[i];
                let file = {
                    'name': IncidentCreateInfo.FILE_NAME_KEY,
                    'filename': fileInfo[FileConstant.FILE_NAME],
                    'data': RNFetchBlob.wrap(fileInfo[FileConstant.URI])
                };
                infoList.push(file);
            }
        }

        if (photoList.length > 0) {
            for (i = 0; i < photoList.length; i++) {
                let photoInfo = photoList[i];
                let photo = {
                    'name': IncidentCreateInfo.FILE_NAME_KEY,
                    'filename': photoInfo[FileConstant.FILE_NAME],
                    'data': RNFetchBlob.wrap(photoInfo[FileConstant.URI])
                };
                infoList.push(photo);
            }
        }

        infoList.push(this.getFieldObject('name', this.props.incidentCreateReducer.victimName));
        infoList.push(this.getFieldObject('parents', this.props.incidentCreateReducer.victimParents));
        infoList.push(this.getFieldObject('location', this.props.incidentCreateReducer.victimLocation));
        infoList.push(this.getFieldObject('age', this.props.incidentCreateReducer.victimAge));
        infoList.push(this.getFieldObject('sex', this.props.incidentCreateReducer.genderTitle.toLowerCase()));
        infoList.push(this.getFieldObject('case_title', this.props.incidentCreateReducer.caseName));
        infoList.push(this.getFieldObject('case_details', this.props.incidentCreateReducer.caseDetails));
        infoList.push(this.getFieldObject('incident_date', getYYYYMMDDWithTime(this.props.incidentCreateReducer.caseDate)));
        infoList.push(this.getFieldObject('case_type', this.getViolenceId()));
        infoList.push(this.getFieldObject('action_taken', this.getActionTypeList()));

        return infoList;
    }

    getFieldObject(key, value) {
        return {
            'name': key,
            'data': String(value)
        };
    }

    getViolenceId() {
        let violenceList = this.props.incidentCreateReducer.violenceList;
        for (i = 0; i < violenceList.length; i++) {
            let violence = violenceList[i];
            if (violence[SelectedConstant.SELECTED]) {
                return violence.id;
            }
        }
        return 0;
    }

    getActionTypeList() {
        let actionTypeList = [];
        let allActionList = this.props.incidentCreateReducer.checkBoxList;
        for (i = 0; i < allActionList.length; i++) {
            let action = allActionList[i];
            if (action[SelectedConstant.CHECKED]) {
                actionTypeList.push(action.id);
            }
        }
        return actionTypeList;
    }

    generateRefereedView() {
        if (!this.props.incidentCreateReducer.checkBoxList || this.props.incidentCreateReducer.checkBoxList.length === 0)return;
        let dataLength = this.props.incidentCreateReducer.checkBoxList.length;
        let data = this.props.incidentCreateReducer.checkBoxList;
        let views = [];
        for (i = 0; i < dataLength; i += 1) {
            views.push(
                <View key={i}>
                    {this.renderCheckBox(data[i])}
                </View>
            )
        }
        return views;

    }

    renderCheckBox(data) {
        let text = data.name;
        return (
            <CheckBox
                style={{flex: 1, paddingVertical: 5}}
                onClick={() => this.onCheckBoxClick(data)}
                isChecked={data[SelectedConstant.CHECKED]}
                leftTextStyle={{
                    color: color.DARK_GRAY,
                    fontSize: size.FONT_SIZE_S
                }}
                checkBoxColor={color.PINK}
                leftText={text}/>
        );
    }

    onCheckBoxClick(data) {
        this.props.updateRefereedBox(data);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
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
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        updateRefereedBox: (refereedData) => dispatch(updateRefereedBox(refereedData)),
        callIncidentCreateApi: (body) => dispatch(callIncidentCreateApi(body))
    }
}

RefereedInfo.navigationOptions = {
    title: AppText.REFEREED,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(RefereedInfo);