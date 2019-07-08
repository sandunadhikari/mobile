import React, {Component} from 'react';
import LoginScreen from './src/LoginScreen';
import {SafeAreaView} from 'react-native';
//import {Root} from "native-base";
import {createStackNavigator} from "react-navigation";
import ParentScreen from './src/parent/index';
import DriverScreen from './src/driver/index';


const AppTabNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,

    },
    Parent:{
        screen:ParentScreen,
    },
    Driver:{
        screen:DriverScreen,
    }


}, {
    initialRouteName: 'Login',
    headerMode: "none"
})

//const AppNavigation = createAppContainer(RootStack);
export default class App extends Component {
    constructor(props) {
        super(props)
        global.__old_console_warn = global.__old_console_warn || console.warn;
        global.console.warn = (...args) => {
            let tst = (args[0] || '') + '';
            if (tst.startsWith('Setting a timer')) {
                return;
            }
            return global.__old_console_warn.apply(console, args);
        };

    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <AppTabNavigator/>
            </SafeAreaView>
        );
    }
}
