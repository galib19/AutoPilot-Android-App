import {StyleSheet} from "react-native";
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import {getStatusBarHeight} from '../../../../components/StatusBarHeight/StatusBarHeight';

const height = 56 + getStatusBarHeight();

export default StyleSheet.create({
    rootStyle: {
        height: height,
        backgroundColor: color.PINK,
        flexDirection: 'row'
    }, iconRootStyle: {
        marginVertical: 16,
        marginHorizontal: 16
    }, titleRootStyle: {
        marginLeft: 16,
        marginBottom: 20,
        justifyContent: 'flex-end',
        flex: 1
    }, titleStyle: {
        fontSize: size.FONT_SIZE_S,
        color: color.WHITE,
        fontWeight: 'bold'
    }
})