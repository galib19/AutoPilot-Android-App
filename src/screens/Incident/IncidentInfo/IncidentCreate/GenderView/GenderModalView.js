import React, {Component} from 'react';
import {
    FlatList
} from 'react-native';

import GenderRowData from "./GenderRowData";
import {connect} from 'react-redux';
import {selectGenderFromIncidentCreate} from '../../../actions/IncidentCreateAction';

class GenderModalView extends Component {
    render() {
        return (
            <FlatList
                data={this.props.incidentCreateReducer.genderList}
                renderItem={({item, index}) => (
                    <GenderRowData data={item}
                                   index={index}
                                   pressGender={this.pressGender.bind(this)}/>
                )}
                keyExtractor={item => item.id.toString()}/>
        );
    }

    pressGender(rowData) {
        this.props.closeGenderPopUp();
        this.props.selectGenderFromIncidentCreate(rowData);
    }

}

function mapStateToProps(state) {
    return {
        incidentCreateReducer: state.incidentCreateReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectGenderFromIncidentCreate: (selectedGender) => dispatch(selectGenderFromIncidentCreate(selectedGender))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderModalView);