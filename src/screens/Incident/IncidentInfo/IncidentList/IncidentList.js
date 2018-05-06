import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import style from './styles/IncidentListStyle';
import IncidentRowData from './IncidentRowData';
import {NEXT_PAGE_WITH_DATA_OBJECT} from '../../../../constants/NavigationActionConstant';
import {updateIncidentObjectForIncidentList} from '../../actions/InclidentListAction';

class IncidentList extends Component {

    _keyExtractor = (item, index) => item.id.toString();

    render() {
        return (
            <View style={style.rootStyle}>
                <FlatList
                    data={this.props.incidentListScreenReducer.incidentList}
                    renderItem={({item}) => (
                        <IncidentRowData data={item}
                                         incidentDetailPress={this.showDetail.bind(this)}/>
                    )}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this.props.loadMoreIncident}
                    ListFooterComponent={this.props.renderFooter}
                    onEndReachedThreshold={0.5}/>
            </View>
        );
    }

    showDetail(rowData) {
        this.props.updateIncidentObjectForIncidentList(rowData);
        this.props.goToNextPage('IncidentDetailScreen', rowData);
    }
}

function mapStateToProps(state) {
    return {
        nav: state,
        incidentListScreenReducer: state.incidentListScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page, rowData) => dispatch({type: NEXT_PAGE_WITH_DATA_OBJECT, nextPage: page, data: rowData}),
        updateIncidentObjectForIncidentList: (rowData) => dispatch(updateIncidentObjectForIncidentList(rowData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncidentList);