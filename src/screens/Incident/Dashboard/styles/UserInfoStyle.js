import {StyleSheet} from "react-native";
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        height: 100,
        backgroundColor: color.PINK
    }, innerViewRootStyle: {
        flexDirection: 'row'
    }, imageCircleViewStyle: {
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.WHITE,
        marginHorizontal: 20
    }, imageStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: color.WHITE
    }, infoRootStyle: {
        flex: 1,
        marginLeft: 72
    }, nameTextStyle: {
        color: color.BLACK,
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_S
    }, designationTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_EXTRA_S
    }, profileImageNameStyle: {
        color: color.PINK,
        fontSize: size.FONT_SIZE_L,
        fontWeight: 'bold'
    }
})