import React, {Component} from 'react';
import {
    View,
    ScrollView,
    BackHandler
} from 'react-native';

import {connect} from 'react-redux';
import style from './styles/IncidentDetailScreenStyle';
import headerBackStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import color from '../../../../constants/Color';
import IncidentDetailViewForList from '../DetailView/IncidentDetailViewForList';
import {PREVIOUS_PAGE} from '../../../../constants/NavigationActionConstant';

class IncidentDetailScreen extends Component {
    render() {
        return (
            <ScrollView style={style.rootStyle} keyboardShouldPersistTaps='handled'>
                <View style={style.detailViewRootStyle}>
                    <IncidentDetailViewForList attachmentSize={52}/>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
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
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backToPreviousPage: () => dispatch({type: PREVIOUS_PAGE})
    }
}

IncidentDetailScreen.navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.case_title,
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.WHITE
});

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetailScreen);