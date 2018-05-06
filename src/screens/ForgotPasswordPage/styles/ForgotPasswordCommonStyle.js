import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerViewRootStyle: {
        flex: 1,
        padding: 20
    }, bottomViewRootStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
        paddingVertical: 20
    }, bottomTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S
    }, resendOtpViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }, resendOtpTextStyle: {
        color: color.lightGray,
        fontSize: size.fontSizeS
    }
})