import {AsyncStorage} from 'react-native';

export const saveDataToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log('AsyncStorage save error: ' + error.message);
    }
};