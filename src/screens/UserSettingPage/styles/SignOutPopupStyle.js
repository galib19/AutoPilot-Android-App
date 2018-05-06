import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        marginVertical: 20,
        alignItems: 'center'
    }, logoutTextStyle: {
        color: color.BLACK,
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_L
    }, logoutWarningTextStyle: {
        fontSize: size.FONT_SIZE_S,
        color: color.DARK_GRAY,
        marginTop: 10
    }, buttonViewStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: color.PINK,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200
    }, buttonTextStyle: {
        color: color.WHITE,
        fontWeight: 'bold',
        fontSize: size.BUTTON_TEXT_SIZE
    }, cancelTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.BUTTON_TEXT_SIZE
    }, cancelViewStyle: {
        paddingVertical: 10
    }
})