import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        backgroundColor: color.PINK,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    }, extensionTextStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'bold'
    }
})