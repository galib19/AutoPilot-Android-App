import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";


import style from './styles/IncidentDetailStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import AppText from '../../../../constants/AppText';
import {getStatusColor} from '../../../../components/StatusColor';
import Entypo from 'react-native-vector-icons/Entypo';
import VictimPersonalInfo from './VictimPersonalInfo';
import AttachmentRowView from './AttachmentRowData';
import PropTypes from 'prop-types';
import {NEXT_PAGE, RESET_PAGE} from '../../../../constants/NavigationActionConstant';
import ModalBox from 'react-native-modalbox';
import CommentScreen from '../CommentView/CommentScreen';
import {getStringValue} from '../../../../components/Validation/EmptyCheck';
import {getYYYYMMDDWithTime} from '../../../../components/DateFormat/FormattedDate';
import {connect} from 'react-redux';
import {updateStatus,callUpdateStatusApi} from '../../actions/IncidentCreateAction';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';

class IncidentDetailViewForDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentVisible: false
        }
    }

    render() {
        let attachmentView = null;
        let commentModalView;
        let ticket = this.props.dashboardScreenReducer.mostRecentCase[0];
        let  acceptView =
        <View>
             <TouchableOpacity
                    underlayColor={color.LIGHT_GRAY_HIGH}
                    style={style.locationButtonStyle}
                    onPress={() => this.props.goToNextPage('MapDashboard')}>
                    <Text>Show on Map</Text>
                </TouchableOpacity>
            
        </View>;
        //let victimInfo = ticket.victims[0];
        

        return (
            <View style={style.rootStyle}>
                
                <View style={style.horizontalBarStyle}/>

                {acceptView}

                {commentModalView}

            </View>
        );
    }

    updateStatusRejected(){
        this.props.updateStatus(IncidentCreateInfo.TICKET_STATUS, 'rejected');
        this.props.updateStatus(IncidentCreateInfo.TICKET_ID, this.props.dashboardScreenReducer.mostRecentCase[0].id);
    } 

    updateStatusButton(){
        this.props.callUpdateStatusApi(this.getStatus());
    }

    getStatus() {
        let infoList = [];

        infoList.push(this.getFieldObject('ticket_id', this.props.incidentCreateReducer.ticket_id));
        infoList.push(this.getFieldObject('ticket_status',this.props.incidentCreateReducer.ticket_status));
        
      
        return infoList;
    }

    getFieldObject(key, value) {
        return {
            'name': key,
            'data': String(value)
        };
    }

    pressComment() {
        this.setState({
            isCommentVisible: true
        })
    }

    closeCommentModal() {
        this.setState({
            isCommentVisible: false
        })
    }

}

IncidentDetailViewForDashboard.propTypes = {
    attachmentSize: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        nav: state,
        dashboardScreenReducer: state.dashboardScreenReducer,
        incidentListScreenReducer: state.incidentListScreenReducer,
        incidentCreateReducer: state.incidentCreateReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page}),
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page}),
        updateStatus: (key, value) => dispatch(updateStatus(key, value)),
        callUpdateStatusApi: (body) => dispatch(callUpdateStatusApi(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetailViewForDashboard);