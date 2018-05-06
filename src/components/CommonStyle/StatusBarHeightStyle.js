import {StyleSheet} from "react-native";

import { getStatusBarHeight } from '../StatusBarHeight/StatusBarHeight';

export default StyleSheet.create({
    statusBarHeightStyle: {
        paddingTop: getStatusBarHeight()
    }
})