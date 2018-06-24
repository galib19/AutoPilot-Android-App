import React, {Component} from 'react';
import {
    View,
    TextInput,
    BackHandler,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {connect} from 'react-redux';
import style from './styles/CaseInfoStyle';
import textInputStyle from '../../../../components/CommonStyle/TextInputStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import PropTypes from 'prop-types';
import {PREVIOUS_PAGE, NEXT_PAGE, RESET_PAGE} from '../../../../constants/NavigationActionConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import ViolenceModalView from './ViolenceType/ViolenceModalView';
import ModalBox from 'react-native-modalbox';
import dismissKeyBoard from 'dismissKeyboard';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import {isTextInputEmpty} from '../../../../components/Validation/EmptyCheck';
import {showToast} from '../../../../components/AlertView/AlertShow';
import CaseInfoInputFiled from "./CaseInfoInputFiled";
import victimInfoStyle from './styles/VictimInfoStyle';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getYYYYMMDDWithTime} from '../../../../components/DateFormat/FormattedDate';
import {setIncidentInfo, setEtaErt, callSetEtaErtApi} from '../../actions/IncidentCreateAction';


const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;


class Map extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            region: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            } 
        }
    }
    render() {

        let ticket = this.props.incidentListScreenReducer.incidentObject;
        latitude = ticket.site.latitude;
        longitude = ticket.site.longitude;
        title= ticket.site.site_name;
        description=ticket.site.thana;
       
        return (
            <View style={style.rootStyle}>
                <View style={styles.container}>
                    <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    >
                    <MapView.Marker
                        coordinate={{ latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude) }}
                        title={ title }
                        description={description}
                    />
                    </MapView>
                </View>
            </View>
        );
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

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }); 


function mapStateToProps(state) {
    return {
        nav: state,
        dashboardScreenReducer: state.dashboardScreenReducer,
        incidentCreateReducer: state.incidentCreateReducer,
        incidentListScreenReducer: state.incidentListScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
    }
}

Map.navigationOptions = {
    title: AppText.TICKET_MAP,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);