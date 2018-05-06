import AppNavigator from '../routes';
import {
    NEXT_PAGE,
    RESET_PAGE,
    NEXT_PAGE_WITH_DATA_OBJECT,
    PREVIOUS_PAGE
} from '../../constants/NavigationActionConstant';
import {NavigationActions} from 'react-navigation';

const SplashScreen = AppNavigator.router.getActionForPathAndParams('SplashScreen');
const initialState = AppNavigator.router.getStateForAction(
    SplashScreen
);

export default (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case NEXT_PAGE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: action.nextPage}),
                state
            );
            break;
        case RESET_PAGE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: action.nextPage})
                    ]
                }), state);
            break;
        case NEXT_PAGE_WITH_DATA_OBJECT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: action.nextPage, params: {data: action.data}}),
                state
            );
            break;
        case PREVIOUS_PAGE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};