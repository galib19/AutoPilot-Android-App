import RNFetchBlob from 'react-native-fetch-blob';
import {
    BASE_URL
} from './Url';
import {AsyncStorage} from 'react-native';
import AsyncStorageConstant from '../constants/AsyncStorageConstant';

class UploadService {
    async uploadFileViaFetchBlob(url, data, isAuthenticate) {
        let requestHeader;
        if (isAuthenticate) {
            requestHeader = {
                'Content-Type': 'multipart/form-data'
            };
            let asyncToken = await AsyncStorage.getItem(AsyncStorageConstant.AUTHORIZATION_TOKEN);
            requestHeader.Authorization = JSON.parse(asyncToken);
        } else {
            requestHeader = {
                'Content-Type': 'multipart/form-data'
            };
        }
        return RNFetchBlob.fetch('POST', BASE_URL + url, requestHeader, data);
    }
}

module.exports = new UploadService();