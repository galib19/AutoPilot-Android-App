import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    headerViewRootStyle: {
        height: 170,
        justifyContent: 'center',
        alignItems: 'center'
    }, headerTextStyle: {
        fontSize: size.FONT_SIZE_L,
        fontWeight: 'bold',
        color: color.BLACK
    }, bodyTextStyle: {
        fontSize: size.FONT_SIZE_M,
        marginTop: 10,
        color: color.DARK_GRAY
    }, headerViewWithoutSubViewStyle: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    }
})