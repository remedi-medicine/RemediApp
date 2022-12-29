import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Constants from "./Constants/Constants";

import Home from './screens/Home';
import Notification from './screens/Notification';
import Cart from './screens/Cart';
import List from './screens/List';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            let iconPath;
                            if (route.name === 'Home') {
                                iconPath = focused
                                ? Constants.img.home1
                                : Constants.img.home0;
                            } else if (route.name === 'Notification') {
                                iconPath = focused
                                ? Constants.img.notif1
                                : Constants.img.notif0;
                            } else if (route.name === 'List') {
                                iconPath = focused
                                ? Constants.img.list1
                                : Constants.img.list0;
                            } else if (route.name === 'Profile') {
                                iconPath = focused 
                                ? Constants.img.profile1
                                : Constants.img.profile0;
                            }
                            return <Image source={iconPath} style={{width: 17.27, height: 16}}/>;
                        },
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: Constants.colors.primaryGreen,
                        tabBarInactiveTintColor: Constants.colors.translucentBlue,
                        })}
                    initialRouteName="Home">
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Notification" component={Notification}/>
                    <Tab.Screen name="Cart" component={Cart}
                    options={{tabBarIcon: () => (<View style={styles.cartContainer}>
                        <Image source={Constants.img.cart} style={{width: 16, height: 16}}/>
                        </View>),}}/>
                    <Tab.Screen name="List" component={List}/>
                    <Tab.Screen name="Profile" component={Profile}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    cartContainer: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.colors.primaryGreen,
        borderRadius: 6,
    },
});