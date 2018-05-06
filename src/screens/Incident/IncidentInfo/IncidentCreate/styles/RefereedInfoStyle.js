import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerViewRootStyle: {
        flex: 1,
        padding: 16
    },
    checkboxTextStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S
    },
    checkBoxTitleStyle: {
        flex: 1,
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_M,
        fontWeight: 'bold'
    }
})