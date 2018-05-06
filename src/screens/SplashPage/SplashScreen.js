import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage,
    Platform
} from 'react-native';

import styles from './styles/SplashScreenStyle';
import AppText from '../../constants/AppText';
import {connect} from 'react-redux';
import {RESET_PAGE} from '../../constants/NavigationActionConstant';
import AsyncStorageConstant from '../../constants/AsyncStorageConstant';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";

class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.rootViewDesign}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerViewRootStyle}>
                        <Image
                            source={require('../../assets/SplashScreen/splash_image.png')}
                            resizeMode={Image.resizeMode.contain}
                            style={styles.imageViewStyle}/>
                    </View>
                </ScrollView>
                <Text style={styles.textStyle}>{AppText.SPLASH_SCREEN_TEXT}</Text>
            </View>
        );
    }

    async componentDidMount() {
        if (Platform.OS === 'ios') {
            FCM.requestPermissions(); // for iOS
        }

        FCM.getInitialNotification().then(notification => {
            console.log('initial notification', notification);
        });


        FCM.on(FCMEvent.Notification, (notif) => {
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {
                return;
            }
            if (Platform.OS === 'ios') {
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData);
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All);
                        break;
                }
            }
        });

        FCM.enableDirectChannel();
        FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
            console.log('direct channel connected' + data);
        });
        setTimeout(function () {
            FCM.isDirectChannelEstablished().then(d => console.log(d));
        }, 1000);

        setTimeout(() => {
            this.setTimePassed();
        }, 3000);
    }

    setTimePassed() {
        let phoneNumber = '', password = '';
        AsyncStorage.multiGet([AsyncStorageConstant.USER_PHONE_NUMBER, AsyncStorageConstant.USER_PASSWORD], (err, stores) => {
            stores.map((result, i, store) => {
                let key = store[i][0];
                if (key === AsyncStorageConstant.USER_PHONE_NUMBER) {
                    phoneNumber = JSON.parse(store[i][1]);
                }
                else if (key === AsyncStorageConstant.USER_PASSWORD) {
                    password = JSON.parse(store[i][1]);
                }
            });
            if (phoneNumber !== null && password !== null && phoneNumber.length > 0 && password.length > 0) {
                this.props.resetPage('IncidentDashboard');
            } else {
                this.props.resetPage('LoginScreen');
            }
        });
    }
}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page})
    }
}

SplashScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);