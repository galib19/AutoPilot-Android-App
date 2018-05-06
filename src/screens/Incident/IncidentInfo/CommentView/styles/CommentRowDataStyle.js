import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flexDirection: 'row',
        marginVertical: 10,
        flex: 1
    }, rightRootStyle: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    }, nameTextStyle: {
        fontSize: size.FONT_SIZE_S,
        color: color.BLACK,
        fontWeight: 'bold',
        flex: 1
    }, commentTextStyle: {
        fontSize: size.FONT_SIZE_S,
        color: color.BLACK,
        flex: 1
    }, dateTimeTextStyle: {
        fontSize: size.FONT_SIZE_EXTRA_SS,
        color: color.DARK_GRAY,
        flex: 1
    }, rowDataCircleViewStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.PINK
    }, imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25
    }, profileImageNameStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_L
    }
})