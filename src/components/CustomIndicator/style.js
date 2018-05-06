import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    },

    progressBar: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    nocontainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0.001,
        height: 0.001
    },

    overlay: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});