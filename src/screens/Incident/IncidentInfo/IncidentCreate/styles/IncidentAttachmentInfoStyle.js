import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerViewRootStyle: {
        flex: 1,
        padding: 15
    }, uploadViewRootStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        flex: 1,
        borderBottomColor: color.TEXT_INPUT_UNDERLINE_COLOR,
        alignItems: 'center',
        paddingBottom: 10,
    }, uploadTextStyle: {
        flex: 1,
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S
    }, imageRootStyle: {
        paddingHorizontal: 10
    }, imageStyle: {
        width: 30,
        height: 30
    }, defaultTopMargin: {
        marginTop: 10
    }, fileColumnStyle: {
        marginTop: 5
    }, fileLabelStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'bold',
        marginBottom: 10
    }, noteStyle: {
        color: color.DARK_GRAY_LOW,
        fontSize: size.FONT_SIZE_EXTRA_S,
        fontWeight: 'bold'
    }
})