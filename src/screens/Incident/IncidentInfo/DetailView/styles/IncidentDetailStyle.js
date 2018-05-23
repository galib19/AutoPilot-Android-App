import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {}, titleRootViewStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }, caseTitleStyle: {
        flex: 1,
        color: color.BLACK,
        fontSize: size.FONT_SIZE_M,
        fontWeight: 'bold'
    }, statusColorViewStyle: {
        width: 20,
        height: 10,
        borderRadius: 3,
        marginLeft: 16
    }, locationRootStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }, locationTextStyle: {
        color: color.DARK_GRAY_LOW,
        fontSize: size.FONT_SIZE_S,
        marginLeft: 5
    }, otherTextStyle: {
        color: color.LIGHT_GRAY_HIGH,
        fontSize: size.FONT_SIZE_S,
        marginTop: 10
    }, personalInfoRootStyle: {
        marginTop: 10
    }, attachmentViewRootStyle: {
        marginTop: 10
    }, attachmentTextStyle: {
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_S,
        marginBottom: 10,
        color: color.DARK_GRAY_LOW
    }, attachmentColumnStyle: {
        marginTop: 5
    }, horizontalBarStyle: {
        flex: 1,
        height: 1,
        backgroundColor: color.LIGHT_GRAY,
        marginTop: 10
    }, commentTextStyle: {
        color: color.LIGHT_GRAY_HIGH,
        fontSize: size.FONT_SIZE_S
    }, commentViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    }, acceptButtonStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: color.COMPLETED_STATUS_COLOR,
        marginTop: 20,
        marginRight: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 3
    }, rejectButtonStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: '#ff9966',
        marginVertical: 13,
        marginRight: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:5 
    }, statusTextStyle: {
        color: color.LIGHT_GRAY_HIGH,
        fontSize: size.FONT_SIZE_S,
        marginLeft: 3
    }
})