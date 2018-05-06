import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, topViewRootStyle: {
        flex: 1,
        padding: 20
    }, forgotPasswordViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    }, forgotPasswordTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S,
        marginVertical: 10
    }, bottomViewRootStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
        paddingVertical: 20
    }, bottomTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S
    }
});