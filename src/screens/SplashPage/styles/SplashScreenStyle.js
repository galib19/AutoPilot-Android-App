import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootViewDesign: {
        flex: 1,
        backgroundColor: color.PINK
    }, innerViewRootStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }, imageViewStyle: {
        width: 200,
        height: 200
    }, textStyle: {
        textAlign: 'center',
        fontSize: size.FONT_SIZE_M,
        color: color.WHITE,
        margin: 15,
        marginBottom: 50
    }
});