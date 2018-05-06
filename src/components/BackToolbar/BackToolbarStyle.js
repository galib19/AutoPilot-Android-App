import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size'

export default StyleSheet.create({
    headerStyle: {
        backgroundColor: color.PINK,
        height: 56,
    }, headerTitleStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'normal'
    }
});