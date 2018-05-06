import React, {Component} from 'react';
import {
    View,
    BackHandler
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/AllIncidentDashboardStyle';
import AppText from '../../../../constants/AppText';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import Status from '../../../../constants/StatusConstant';
import StatusView from '../../../../components/StatusView/StatusView';
import IncidentList from './IncidentList';
import {PREVIOUS_PAGE} from '../../../../constants/NavigationActionConstant';
import {getAllIncident, initializeValue} from '../../actions/InclidentListAction';
import CustomIndicator from '../../../../components/CustomIndicator';
import FooterIndicator from '../../../../components/FooterComponent/FooterIndicator';

class AllIncidentDashboard extends Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.props.initializeValue();
    }

    render() {
        return (
            <View style={style.rootStyle}>
                <View style={style.statusRootStyle}>
                    <StatusView backgroundColor={color.NEW_STATUS_COLOR} title={Status.NEW}/>
                    <StatusView backgroundColor={color.REVIEW_STATUS_COLOR} title={Status.REVIEWED}/>
                    <StatusView backgroundColor={color.OPEN_STATUS_COLOR} title={Status.OPEN}/>
                    <StatusView backgroundColor={color.APPROVED_STATUS_COLOR} title={Status.APPROVED}/>
                    <StatusView backgroundColor={color.ARCHIVED_STATUS_COLOR} title={Status.ARCHIVED}/>
                    <StatusView backgroundColor={color.CLOSE_STATUS_COLOR} title={Status.CLOSE}/>
                </View>

                <IncidentList renderFooter={this.renderFooter.bind(this)}
                              loadMoreIncident={this.loadMoreIncident.bind(this)}/>

                <CustomIndicator isVisible={this.props.incidentListScreenReducer.isFetching}/>
            </View>
        );
    }

    renderFooter = () => {
        let storeCurrentPage = this.props.incidentListScreenReducer.incidentListCurrentPage;
        let storeLastPage = this.props.incidentListScreenReducer.incidentListLastPage;
        if (storeCurrentPage < storeLastPage) {
            return <FooterIndicator/>;
        }
        return null
    };

    loadMoreIncident = () => {
        let storeCurrentPage = this.props.incidentListScreenReducer.incidentListCurrentPage;
        let storeLastPage = this.props.incidentListScreenReducer.incidentListLastPage;
        if (this.currentPage === storeCurrentPage && storeCurrentPage < storeLastPage) {
            this.currentPage = this.currentPage + 1;
            this.callAllIncidentApi(this.currentPage);
        }
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.callAllIncidentApi(this.currentPage)
    }

    callAllIncidentApi(pageNumber) {
        let parameter = {
            'page': pageNumber
        };
        this.props.getAllIncident(parameter);
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

function mapStateToProps(state) {
    return {
        nav: state,
        incidentListScreenReducer: state.incidentListScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE}),
        getAllIncident: (parameter) => dispatch(getAllIncident(parameter)),
        initializeValue: () => dispatch(initializeValue())
    }
}

AllIncidentDashboard.navigationOptions = {
    title: AppText.ALL_CASE,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
};

export default connect(mapStateToProps, mapDispatchToProps)(AllIncidentDashboard);