import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import color from '../../../../constants/Color';
import {getStatusColor} from '../../../../components/StatusColor';
import size from '../../../../constants/Size';
import VictimPersonalInfo from '../DetailView/VictimPersonalInfo';
import AppText from '../../../../constants/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import style from './styles/IncidentRowDataStyle';
import {getDateMMM} from '../../../../components/DateFormat/FormattedDate';
import {getStringValue} from '../../../../components/Validation/EmptyCheck';

class IncidentRowData extends Component {
    render() {
        let victimInfo = this.props.data.victims[0];
        return (
            <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                              onPress={() => this.props.incidentDetailPress(this.props.data)}>
                <View style={style.rootStyle}>
                    <View style={style.topViewRootStyle}>
                        <Text style={style.dateTextStyle}>{getDateMMM(this.props.data.incident_date)}</Text>
                        <View style={[style.statusColorViewStyle,
                            {backgroundColor: getStatusColor(this.props.data.case_status)}]}/>
                    </View>
                    <Text style={style.caseTitleTextStyle}>
                        {this.props.data.case_title}
                    </Text>

                    <Text style={style.personalInfoRootStyle}>
                        <VictimPersonalInfo label={AppText.VICTIM_NAME_LABEL}
                                            value={getStringValue(victimInfo.name)}/>
                    </Text>

                    <View style={style.locationRootStyle}>
                        <Entypo name='location-pin' color={color.DARK_GRAY_LOW} size={size.TOOLBAR_ICON_SIZE}/>
                        <Text style={style.locationTextStyle}>
                            {getStringValue(victimInfo.location)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default IncidentRowData;