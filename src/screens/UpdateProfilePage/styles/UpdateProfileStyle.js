import {StyleSheet} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerViewRootStyle: {
        flex: 1,
        padding: 16
    }, profilePictureRootStyle: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    }, imageRootStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: color.PINK,
        justifyContent: 'center',
        alignItems: 'center'
    }, emptyProfilePictureStyle: {
        width: 50,
        height: 50
    }, profilePictureStyle: {
        width: 98,
        height: 98,
        borderRadius: 49,
        borderWidth: 2,
        borderColor: color.PINK
    }
})