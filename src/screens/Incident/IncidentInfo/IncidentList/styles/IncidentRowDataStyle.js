import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        padding: 16,
        backgroundColor: color.WHITE,
        marginTop: 10
    }, topViewRootStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }, dateTextStyle: {
        flex: 1,
        marginRight: 10,
        fontSize: size.FONT_SIZE_S
    }, statusColorViewStyle: {
        width: 40,
        height: 12,
        borderRadius: 3
    }, caseTitleTextStyle: {
        flex: 1,
        color: color.BLACK,
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'bold',
        marginTop: 5
    }, personalInfoRootStyle: {
        marginTop: 5
    }, locationRootStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }, locationTextStyle: {
        color: color.DARK_GRAY_LOW,
        fontSize: size.FONT_SIZE_S,
        marginLeft: 5
    }
})