import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/configs/configureStore';
import AppWithNavigationState from './src/configs/utils/AppWithNavigationState';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}
