import {StyleSheet} from "react-native";
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        backgroundColor: color.LIGHT_GRAY,
        flex: 1
    }, topViewRootStyle: {
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center'
    }, currentCaseTextStyle: {
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'bold',
        color: color.BLACK
    }, statusViewRootStyle: {
        marginLeft: 20,
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    }, detailViewRootStyle: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        padding: 16
    }, previousCaseButtonRootStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: color.WHITE,
        marginVertical: 20,
        marginRight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16
    }, previousCaseButtonTextStyle: {
        color: color.BLACK,
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_S
    }, emptyViewRootStyle: {
        flex: 1,
        backgroundColor: color.WHITE,
        marginHorizontal: 16,
        marginBottom: 16
    }, emptyHeaderStyle: {
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_M,
        color: color.BLACK,
        textAlign: 'center',
        marginTop: 30
    }, emptyBodyTextStyle: {
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_S,
        color: color.DARK_GRAY,
        textAlign: 'center',
        marginTop: 10
    }, addCaseViewStyle: {
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center',
        marginBottom: 16
    }, addCaseTextStyle: {
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_S,
        color: color.DARK_GRAY,
        marginTop: 10
    }
})