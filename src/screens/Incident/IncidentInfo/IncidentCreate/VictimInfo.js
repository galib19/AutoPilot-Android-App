import React, {Component} from 'react';
import {
    View,
    BackHandler,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/VictimInfoStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import {PREVIOUS_PAGE, NEXT_PAGE} from '../../../../constants/NavigationActionConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import GenderModalView from './GenderView/GenderModalView';
import ModalBox from 'react-native-modalbox';
import VictimInfoInputField from "./VictimInfoInputField";
import dismissKeyBoard from 'dismissKeyboard';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import {isTextInputEmpty} from '../../../../components/Validation/EmptyCheck';
import {showToast} from '../../../../components/AlertView/AlertShow';
import {initialCreateInfo, getAllSettingApi} from '../../actions/IncidentCreateAction';
import CustomIndicator from '../../../../components/CustomIndicator';

class VictimInfo extends Component {
    constructor(props) {
        super(props);
        this.props.initialCreateInfo();
        this.state = {
            isGenderPopUpVisible: false
        }
    }

    render() {
        let genderPopUpView;

        if (this.state.isGenderPopUpVisible) {
            genderPopUpView =
                <Modal visible={true} transparent={true}
                       onRequestClose={() => this.closeGenderPopUp()}>

                    <ModalBox position={"bottom"}
                              isOpen={true}
                              onClosed={() => this.closeGenderPopUp()}
                              animationDuration={200}
                              style={style.bottomPopUpStyle}>

                        <GenderModalView closeGenderPopUp={this.closeGenderPopUp.bind(this)}/>
                    </ModalBox>
                </Modal>

        } else {
            genderPopUpView = null;
        }

        return (
            <View style={[style.rootStyle, {paddingBottom: 16}]}>
                <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                    <View style={style.innerViewRootStyle}>

                        <VictimInfoInputField />

                        <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.genderPress()}>
                            <View style={style.dropDownRootStyle}>
                                <Text
                                    style={style.dropDownTextStyle}>{this.props.incidentCreateReducer.genderTitle}</Text>
                                <View style={style.dropDownIconViewStyle}>
                                    <MaterialIcons name="arrow-drop-down"
                                                   size={size.TOOLBAR_ICON_SIZE}
                                                   color={color.DARK_GRAY}/>
                                </View>
                            </View>

                        </TouchableOpacity>

                        <CustomButton pressButton={this.nextButtonPress.bind(this)} title={AppText.NEXT.toUpperCase()}/>
                    </View>
                </ScrollView>

                {genderPopUpView}

                <CustomIndicator isVisible={this.props.incidentCreateReducer.isFetching}/>

            </View>
        );
    }

    closeGenderPopUp() {
        this.setState({
            isGenderPopUpVisible: false
        })
    }

    nextButtonPress() {
        if (isTextInputEmpty(this.props.incidentCreateReducer.victimName)) {
            showToast(AppText.VICTIM_NAME_EMPTY_MESSAGE)
        } else if (isTextInputEmpty(this.props.incidentCreateReducer.victimParents)) {
            showToast(AppText.PARENTS_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.props.incidentCreateReducer.victimAge)) {
            showToast(AppText.AGE_EMPTY_MESSAGE);
        } else if (isTextInputEmpty(this.props.incidentCreateReducer.victimLocation)) {
            showToast(AppText.LOCATION_EMPTY_MESSAGE);
        } else if (this.props.incidentCreateReducer.genderTitle === IncidentCreateInfo.SELECT_GENDER) {
            showToast(AppText.SELECT_YOUR_GENDER);
        } else {
            this.props.goToNextPage('CaseInfo');
        }
    }

    genderPress() {
        dismissKeyBoard();
        this.setState({
            isGenderPopUpVisible: true
        })
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.getAllSettingApi();
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
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        initialCreateInfo: () => dispatch(initialCreateInfo()),
        getAllSettingApi: () => dispatch(getAllSettingApi())
    }
}

VictimInfo.navigationOptions = {
    title: AppText.VICTIM_INFO,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(VictimInfo);