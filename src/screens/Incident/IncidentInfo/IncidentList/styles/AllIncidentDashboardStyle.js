import {StyleSheet} from "react-native";
import color from '../../../../../constants/Color';
import size from '../../../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        backgroundColor: color.LIGHT_GRAY,
        padding: 16,
        flex: 1
    }, statusRootStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})