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

class VictimInfoInputField extends Component {
    render() {
        return (
            <View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='VictimName'
                        placeholder={AppText.VICTIM_NAME_LABEL}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.VICTIM_NAME, text)}
                        onSubmitEditing={() => this.focusNextField('ParORHus')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='ParORHus'
                        placeholder={AppText.PARENTS_OR_HUSBAND}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.PAR_OR_HUS, text)}
                        returnKeyType='next'
                        onSubmitEditing={() => this.focusNextField('Age')}
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='Age'
                        placeholder={AppText.AGE_LABEL}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        keyboardType='numeric'
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.AGE, text)}
                        onSubmitEditing={() => this.focusNextField('Location')}
                        returnKeyType='next'
                        placeholderTextColor={color.DARK_GRAY}/>
                </View>
                <View style={textInputStyle.fullWidthTextInputRootStyle}>
                    <TextInput
                        style={textInputStyle.fullWidthTextInputStyle}
                        ref='Location'
                        placeholder={AppText.LOCATION}
                        underlineColorAndroid="transparent"
                        selectionColor={color.DARK_GRAY}
                        autoCorrect={false}
                        onChangeText={(text) => this.props.setIncidentInfo(IncidentCreateInfo.LOCATION, text)}
                        returnKeyType='done'
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

export default connect(mapStateToProps, mapDispatchToProps)(VictimInfoInputField);