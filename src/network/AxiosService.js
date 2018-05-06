import {
    BASE_URL
} from './Url';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import AsyncStorageConstant from '../constants/AsyncStorageConstant';

class AxiosService {
    async getServiceData(url, parameter, isAuthenticate) {
        let requestHeader;
        if (isAuthenticate) {
            requestHeader = {
                'Accept': 'application/json'
            };
            let asyncToken = await AsyncStorage.getItem(AsyncStorageConstant.AUTHORIZATION_TOKEN);
            requestHeader.Authorization = JSON.parse(asyncToken);
        } else {
            requestHeader = {
                'Content-Type': 'application/json'
            };
        }
        return axios.get(BASE_URL + url, {
            params: parameter,
            headers: requestHeader
        })
    }

    async postServiceData(url, body, isAuthenticate) {
        let requestHeader;
        if (isAuthenticate) {
            requestHeader = {
                'Accept': 'application/json'
            };
            let asyncToken = await AsyncStorage.getItem(AsyncStorageConstant.AUTHORIZATION_TOKEN);
            requestHeader.Authorization = JSON.parse(asyncToken);
        } else {
            requestHeader = {
                'Content-Type': 'application/json'
            };
        }
        return axios.post(BASE_URL + url, body, {
            headers: requestHeader
        })
    }
}

module.exports = new AxiosService();
