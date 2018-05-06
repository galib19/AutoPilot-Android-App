import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginVertical: 2
    }, squareBoxStyle: {
        width: 12,
        height: 12,
        borderRadius: 3
    }, textStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_EXTRA_SS,
        marginLeft: 5
    }
})