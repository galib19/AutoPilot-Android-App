import {Platform, StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    fullWidthTextInputRootStyle: {
        flexDirection: 'row',
        marginTop: 5
    }, fullWidthTextInputStyle: {
        flex: 1,
        fontSize: size.FONT_SIZE_S,
        borderBottomWidth: 1,
        borderBottomColor: color.TEXT_INPUT_UNDERLINE_COLOR,
        ...Platform.select({
            ios: {
                paddingBottom: 15,
                paddingTop: 15
            },
            android: {
                paddingBottom: 10,
                paddingTop: 10
            }
        })
    }
})