import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE,
    }, profileInfoRootStyle: {
        flexDirection: 'row',
        flex: 1
    }, imageCircleViewStyle: {
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.PINK
    }, imageStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: color.PINK
    }, profileImageNameStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_L
    }, profileImageEmptyBackground: {
        backgroundColor: color.PINK
    }, rightRootStyle: {
        marginLeft: 16,
        justifyContent: 'center',
        flex: 1
    }, nameTextStyle: {
        fontSize: size.FONT_SIZE_S,
        color: color.BLACK,
        fontWeight: 'bold'
    }, designationTextStyle: {
        fontSize: size.FONT_SIZE_EXTRA_S,
        color: color.DARK_GRAY
    }, settingRootStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    }, settingImageRootStyle: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }, settingImageStyle: {
        width: size.TOOLBAR_ICON_SIZE,
        height: size.TOOLBAR_ICON_SIZE
    }, settingTextStyle: {
        marginLeft: 16,
        fontSize: size.FONT_SIZE_S,
        color: color.DARK_GRAY
    }, settingTopLabelStyle: {
        marginTop: 16,
        fontSize: size.FONT_SIZE_EXTRA_S,
        color: color.DARK_GRAY,
        fontWeight: 'bold'
    }, signOutPopupStyle: {
        height: 'auto',
        maxHeight: 300,
        borderRadius: 10
    }
})