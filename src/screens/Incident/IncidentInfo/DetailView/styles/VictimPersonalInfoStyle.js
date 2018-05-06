import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    labelStyle: {
        color: color.DARK_GRAY_LOW,
        fontSize: size.FONT_SIZE_EXTRA_S,
        fontWeight: 'bold'
    }, valueStyle: {
        color: color.DARK_GRAY_LOW,
        fontSize: size.FONT_SIZE_EXTRA_S,
        marginLeft: 5
    }
})