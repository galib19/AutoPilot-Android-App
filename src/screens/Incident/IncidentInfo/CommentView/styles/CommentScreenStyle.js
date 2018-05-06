import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1
    }, topBarHeaderRootStyle: {
        flexDirection: 'row'
    }, backIconRootStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 16,
        flex: 1
    }, titleRootStyle: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 16
    }, titleStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_S
    }, crossIconRootStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        flex: 1
    }, flatListStyle: {
        marginTop: 16,
        marginHorizontal: 16,
        marginBottom: 10
    }, commentBoxRootStyle: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16
    }, commentBoxStyle: {
        flex: 1,
        fontSize: size.FONT_SIZE_S
    }, commentTouchableOpacityStyle: {
        paddingHorizontal: 5
    }, commentSendIconStyle: {
        width: size.TOOLBAR_ICON_SIZE,
        height: size.TOOLBAR_ICON_SIZE
    }
})