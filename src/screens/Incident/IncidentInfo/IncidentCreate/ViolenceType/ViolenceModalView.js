import React, {Component} from 'react';
import {
    FlatList
} from 'react-native';

import ViolenceRowData from "./ViolenceRowData";
import {connect} from 'react-redux';
import {selectViolenceTypeFromIncidentCreate} from '../../../actions/IncidentCreateAction';

class ViolenceModalView extends Component {
    render() {
        return (
            <FlatList
                data={this.props.incidentCreateReducer.violenceList}
                renderItem={({item, index}) => (
                    <ViolenceRowData data={item}
                                     index={index}
                                     pressViolence={this.pressViolence.bind(this)}/>
                )}
                keyExtractor={item => item.id.toString()}/>
        );
    }

    pressViolence(rowData) {
        this.props.closeViolencePopUp();
        this.props.selectViolenceTypeFromIncidentCreate(rowData);
    }

}

function mapStateToProps(state) {
    return {
        incidentCreateReducer: state.incidentCreateReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectViolenceTypeFromIncidentCreate: (selectedViolence) => dispatch(selectViolenceTypeFromIncidentCreate(selectedViolence))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViolenceModalView);