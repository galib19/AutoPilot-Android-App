import Toast from 'react-native-simple-toast';
import AppText from '../../constants/AppText';
import {
    Alert
} from 'react-native';

export function showEmptyAlert(message) {
    alert(message);
}

export function showToast(message) {
    Toast.show(message, Toast.SHORT);
}

export function showAlertWithCallback(title, body, data, callback) {
    Alert.alert(title, body,
        [
            {
                text: AppText.CANCEL_BUTTON, onPress: () => console.log('Cancel Pressed'), style: 'cancel'
            },
            {
                text: AppText.OK_BUTTON, onPress: () => {
                callback(data);
            }
            },
        ],
        {cancelable: false}
    )
}