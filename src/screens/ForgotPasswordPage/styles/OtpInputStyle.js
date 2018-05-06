import {StyleSheet, Platform} from "react-native";
import color from '../../../constants/Color';
import size from '../../../constants/Size';

export default StyleSheet.create({
    rootStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, textInputStyle: {
        textAlign: 'center',
        marginHorizontal: 10,
        width: 40,
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