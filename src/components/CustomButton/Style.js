import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    buttonViewStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: color.PINK,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }, buttonTextStyle: {
        color: color.WHITE,
        fontWeight: 'bold',
        fontSize: size.BUTTON_TEXT_SIZE
    }
})