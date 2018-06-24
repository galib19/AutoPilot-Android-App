import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';
 
import { Col, Row, Grid } from "react-native-easy-grid";

import style from './styles/IncidentDetailStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import AppText from '../../../../constants/AppText';
import {getStatusColor} from '../../../../components/StatusColor';
import Entypo from 'react-native-vector-icons/Entypo';
import VictimPersonalInfo from './VictimPersonalInfo';
import {NEXT_PAGE, RESET_PAGE} from '../../../../constants/NavigationActionConstant';
import AttachmentRowView from './AttachmentRowData';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import CommentScreen from '../CommentView/CommentScreen';
import {getStringValue} from '../../../../components/Validation/EmptyCheck';
import {getYYYYMMDDWithTime} from '../../../../components/DateFormat/FormattedDate';
import {connect} from 'react-redux';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import {updateStatus,callUpdateStatusApi} from '../../actions/IncidentCreateAction';

class IncidentDetailViewForList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentVisible: false
        }
    }

    render() {
        let attachmentView = null;
        let commentModalView;
        let ticket = this.props.incidentListScreenReducer.incidentObject;
        let isAssigned = (ticket.ticket_status == "assigned");
        let isInProgress = (ticket.ticket_status == "in-progress"); 
        let acceptView = null;
        let inProgressView = null; 

        if (isAssigned) {
            acceptView =
            <View>
                <TouchableOpacity
                    underlayColor={color.LIGHT_GRAY_HIGH}
                    style={style.locationButtonStyle}
                    onPress={() => this.props.goToNextPage('Map')}>
                    <Text>Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={style.acceptButtonStyle}
                    onPress={() => this.props.goToNextPage('AcceptInfo')}>
                    <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={style.rejectButtonStyle}
                    onPressIn={this.updateStatusRejected.bind(this)}
                    onPress={this.updateStatusButton.bind(this)}>
                    <Text>Reject</Text>
                </TouchableOpacity>
            </View>;
        } else if (isInProgress){
            inProgressView =
            <View>
                 <TouchableOpacity
                    underlayColor={color.LIGHT_GRAY_HIGH}
                    style={style.locationButtonStyle}
                    onPress={() => this.props.goToNextPage('Map')}>
                    <Text>Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={style.acceptButtonStyle}
                     onPressIn={this.updateStatusCompleted.bind(this)}
                    onPress={this.updateStatusButton.bind(this)}>
                    <Text>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    underlayColor={color.BUTTON_PRESS_COLOR}
                    style={style.rejectButtonStyle}
                    onPressIn={this.updateStatusFailed.bind(this)}
                    onPress={this.updateStatusButton.bind(this)}>
                    <Text>Failed</Text>
                </TouchableOpacity>
            </View>;
        }


        return (
            <View style={style.rootStyle}>
                <View style={[style.statusColorViewStyle,
                        {backgroundColor: getStatusColor(ticket.ticket_status)}]}/>
                       
                <View style={style.titleRootViewStyle}>
                    <Text style={style.caseTitleStyle}>TT No: {ticket.ticket_number}</Text>
                </View>
                <View
                    style={{
                        marginTop: 5, 
                        borderWidth: 0.3,
                        borderColor:'white',
                        marginRight:25,
                    }}
                />
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Site Id:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{ticket.site.id}</Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Zone:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{ticket.site.zone}</Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Vendor Name:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{ticket.vendor_name}</Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Raised Time:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{getYYYYMMDDWithTime(ticket.raised_time)}</Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Raised E.CO Concern Name:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}> </Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Assigner Cell No:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}> </Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Given For:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}> </Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>Ticket Type:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{ticket.ticket_type}</Text></Col>
                </Grid>
                <Grid style={style.gridStyle}>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>PG Owner:</Text></Col>
                    <Col style={style.columnStyle}><Text style={style.columnTextStyle}>{ticket.pg_owner}</Text></Col>
                </Grid>
                <View style={style.horizontalBarStyle}/>

                {acceptView}
                        
                {inProgressView}

                {attachmentView}

                <View style={style.horizontalBarStyle}/>

                {commentModalView}
                

            </View>
        );
    }

    updateStatusRejected(){
        this.props.updateStatus(IncidentCreateInfo.TICKET_STATUS, 'rejected');
        this.props.updateStatus(IncidentCreateInfo.TICKET_ID, this.props.incidentListScreenReducer.incidentObject.id);
    } 

    updateStatusFailed(){
        this.props.updateStatus(IncidentCreateInfo.TICKET_STATUS, 'failed');
        this.props.updateStatus(IncidentCreateInfo.TICKET_ID, this.props.incidentListScreenReducer.incidentObject.id);
    }

    updateStatusCompleted(){
        this.props.updateStatus(IncidentCreateInfo.TICKET_STATUS, 'completed');
        this.props.updateStatus(IncidentCreateInfo.TICKET_ID, this.props.incidentListScreenReducer.incidentObject.id);
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



IncidentDetailViewForList.propTypes = {
    attachmentSize: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        nav: state,
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

IncidentDetailViewForList.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetailViewForList);