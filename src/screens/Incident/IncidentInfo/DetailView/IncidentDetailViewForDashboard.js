import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native';

import style from './styles/IncidentDetailStyle';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import AppText from '../../../../constants/AppText';
import {getStatusColor} from '../../../../components/StatusColor';
import Entypo from 'react-native-vector-icons/Entypo';
import VictimPersonalInfo from './VictimPersonalInfo';
import AttachmentRowView from './AttachmentRowData';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import CommentScreen from '../CommentView/CommentScreen';
import {getStringValue} from '../../../../components/Validation/EmptyCheck';
import {getDateMMM} from '../../../../components/DateFormat/FormattedDate';
import {connect} from 'react-redux';

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
        let incident = this.props.dashboardScreenReducer.mostRecentCase[0];
        let victimInfo = incident.victims[0];
        if (incident.attachement !== null && incident.attachement.length > 0) {
            attachmentView =
                <View style={style.attachmentViewRootStyle}>
                    <Text style={style.attachmentTextStyle}>
                        {incident.attachement.length} Attachments
                    </Text>

                    <FlatList
                        data={incident.attachement}
                        renderItem={({item}) => (
                            <AttachmentRowView data={item}
                                               attachmentSize={this.props.attachmentSize}/>
                        )}
                        numColumns={5}
                        columnWrapperStyle={style.attachmentColumnStyle}
                        keyExtractor={item => item.AttachmentId}/>
                </View>

        } else {
            attachmentView = null;
        }

        if (this.state.isCommentVisible) {
            commentModalView =
                <Modal visible={true} transparent={true}
                       onRequestClose={() => this.closeCommentModal()}>

                    <ModalBox isOpen={true}
                              swipeArea={0}
                              swipeToClose={false}
                              position={'top'}
                              animationDuration={200}
                              keyboardTopOffset={0}
                              onClosed={() => this.closeCommentModal()}>

                        <CommentScreen id={incident.id}
                                       closeCommentScreen={this.closeCommentModal.bind(this)}/>

                    </ModalBox>
                </Modal>
        } else {
            commentModalView = null;
        }

        return (
            <View style={style.rootStyle}>
                <View style={style.titleRootViewStyle}>
                    <Text style={style.caseTitleStyle}>{incident.case_title}</Text>
                    <View style={[style.statusColorViewStyle,
                        {backgroundColor: getStatusColor(incident.case_status)}]}/>
                </View>
                <View style={style.locationRootStyle}>
                    <Entypo name='location-pin' color={color.DARK_GRAY_LOW} size={size.TOOLBAR_ICON_SIZE}/>
                    <Text style={style.locationTextStyle}>
                        {getStringValue(victimInfo.location)}
                    </Text>
                </View>

                <Text style={style.otherTextStyle}>{getDateMMM(incident.incident_date)}</Text>

                <Text style={style.personalInfoRootStyle}>
                    <VictimPersonalInfo label={AppText.VICTIM_NAME_LABEL}
                                        value={getStringValue(victimInfo.name)}/>
                    <VictimPersonalInfo label={AppText.AGE_LABEL}
                                        value={getStringValue(victimInfo.age + "")}/>
                    <VictimPersonalInfo label={AppText.PARENTS_LABEL}
                                        value={getStringValue(victimInfo.parents)}/>
                    <VictimPersonalInfo label={AppText.GENDER_LABEL}
                                        value={getStringValue(victimInfo.sex)}/>
                </Text>

                <Text style={style.otherTextStyle}>{incident.case_details}</Text>

                {attachmentView}

                <View style={style.horizontalBarStyle}/>

                <View style={style.commentViewStyle}>
                    <TouchableOpacity onPress={() => this.pressComment()}
                                      underlayColor={color.BUTTON_PRESS_COLOR}>
                        <Text style={style.commentTextStyle}>
                            {incident.total_comments} comments
                        </Text>
                    </TouchableOpacity>
                </View>

                {commentModalView}

            </View>
        );
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
        dashboardScreenReducer: state.dashboardScreenReducer
    }
}

export default connect(mapStateToProps)(IncidentDetailViewForDashboard);