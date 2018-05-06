import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerViewRootStyle: {
        flex: 1,
        paddingHorizontal: 16
    }, dropDownRootStyle: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: 5,
        borderBottomWidth: 1,
        flex: 1,
        borderBottomColor: color.TEXT_INPUT_UNDERLINE_COLOR,
        alignItems: 'center'
    }, dropDownTextStyle: {
        flex: 1,
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S
    }, dropDownIconViewStyle: {
        marginVertical: 5
    }, bottomPopUpStyle: {
        height: 'auto',
        maxHeight: 300
    }
})