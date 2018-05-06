import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import style from './styles/ToolbarStyle';
import statusBarStyle from '../../../components/CommonStyle/StatusBarHeightStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import size from '../../../constants/Size';
import color from '../../../constants/Color';
import AppText from '../../../constants/AppText';
import {connect} from 'react-redux';
import {NEXT_PAGE} from '../../../constants/NavigationActionConstant';

class Toolbar extends Component {
    render() {
        return (
            <View style={[style.rootStyle, statusBarStyle.statusBarHeightStyle]}>
                <TouchableOpacity underlayColor={color.BUTTON_PRESS_COLOR}
                                  onPress={() => this.props.goToNextPage('UserSettingScreen')}>
                    <View style={style.iconRootStyle}>
                        <MaterialIcons name='menu' color={color.WHITE} size={size.TOOLBAR_ICON_SIZE}/>
                    </View>
                </TouchableOpacity>
                <View style={style.titleRootStyle}>
                    <Text style={style.titleStyle}>{AppText.DASHBOARD_TITLE}</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);