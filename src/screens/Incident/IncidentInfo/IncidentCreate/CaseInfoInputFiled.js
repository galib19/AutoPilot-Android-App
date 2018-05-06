import React, {Component} from 'react';
import {
    View,
    TextInput
} from 'react-native';

import textInputStyle from '../../../../components/CommonStyle/TextInputStyle';
import color from '../../../../constants/Color';
import AppText from '../../../../constants/AppText';
import IncidentCreateInfo from '../../../../constants/IncidentCreateInfo';
import {setIncidentInfo} from '../../actions/IncidentCreateAction';
import {connect} from 'react-redux';

class CaseInfoInputFiled extends Component {
    render() {
        return (
            <View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='CaseName'
                        placeholder={AppText.CASE_NAME}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.CASE_NAME, text)}
                        onSubmitEditing={() => this.focusNextField('CaseDetail')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={[textInputStyle.fullWidthTextInputRootStyle, {minHeight: 100}]}>
                    <TextInput
                        style={[textInputStyle.fullWidthTextInputStyle, {textAlignVertical: 'top'}]}
                        ref='CaseDetail'
                        placeholder={AppText.CASE_DETAILS}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        multiline={true}
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.CASE_DETAILS, text)}
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
            </View>
        )
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }
}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setIncidentInfo: (key, value) => dispatch(setIncidentInfo(key, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseInfoInputFiled);