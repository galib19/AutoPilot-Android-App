import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootViewStyle: {
        padding: 16,
        flexDirection: 'row'
    }, textStyle: {
        flex: 1,
        fontSize: size.FONT_SIZE_S,
        color: color.DARK_GRAY
    }, imageViewStyle: {
        width: size.TOOLBAR_ICON_SIZE,
        height: size.TOOLBAR_ICON_SIZE
    }
})