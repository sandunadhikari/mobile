import React, {Component} from 'react';
import {StyleSheet, View, Image, SafeAreaView, ScrollView, Dimensions, Text, AsyncStorage} from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    DrawerItems,
    NavigationActions,
    StackActions
} from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome';
import Home from './home'
import Profile from './profile'
import Details from './detailsForm'


import {Button} from "native-base";
//import FB from '../config'
import LoginScreen from "../LoginScreen";


const CustomDrawerComponent = (props) => (

    <SafeAreaView style={{flex: 1}}>

        <View style={{height: 200, backgroundColor: '#6c757d', alignItems: 'center', justifyContent: 'center'}}>

            <View>
                <Image source={require('../imgs/school.png')} style={{height: 80, width: 80, borderRadius: 60}}/>
            </View>
            <View style={{paddingTop: 10, textAlign: 'center'}}>
                <Text style={{color:'#ffffff'}}>admin@gmail.com</Text>
            </View>

        </View>

        <ScrollView>
            <DrawerItems {...props} />
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 15}}>
                    <Icons
                        name="sign-out"
                        size={20}
                    />
                </View>
                <View>
                    <Button transparent dark
                            onPress={() => props.screenProps()}
                    >
                        <Text style={{marginLeft: 15, color: '#151414', fontWeight: 'bold'}}>Logout</Text>
                    </Button>

                </View>


            </View>

        </ScrollView>

    </SafeAreaView>


)
export const getDrawerNavigationOptions = (title, drawerIcon) => ({
    title,
    drawerLabel: title,
    drawerIcon,
});
const getDrawerIcon = (iconName, tintColor) => <Icons name={iconName} size={20} color={tintColor}/>;

const homeDrawerIcon = ({tintColor}) => getDrawerIcon('home', tintColor);
const profileDrawerIcon = ({tintColor}) => getDrawerIcon('user', tintColor);
const detailsDrawerIcon = ({tintColor}) => getDrawerIcon('user', tintColor);

const homeNavOptions = getDrawerNavigationOptions('Home', homeDrawerIcon);
const profileNavOptions = getDrawerNavigationOptions('Profile', profileDrawerIcon);
const detailsNavOptions = getDrawerNavigationOptions('Details', detailsDrawerIcon);

const AppDrawerNavigator = createDrawerNavigator({

    Home: {
        screen: Home,
        navigationOptions: homeNavOptions
    },
    Profile: {
        screen: Profile,
        navigationOptions: profileNavOptions
    },
    Details:{
        screen: Details,
        navigationOptions: detailsNavOptions
    }



}, {
    initialRouteName: "Home",

    contentComponent: CustomDrawerComponent

})
const AppStackNavigator = createStackNavigator({
    AppDrawerNavigator: {
        screen: AppDrawerNavigator,
    },
    Login: {
        screen: LoginScreen,
    }


}, {
    initialRouteName: "AppDrawerNavigator",
    headerMode: "none"
})


//const AppContainer = createAppContainer(AppDrawerNavigator);
export default class App extends Component<> {
    constructor(props) {
        super(props);
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }


    async logoutCurrentUser() {
        {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('role');
            this.props.navigation.navigate('Login');
        }

    }


    render() {
        return (
            <AppStackNavigator screenProps={this.logoutCurrentUser}/>
        );
    }
}

