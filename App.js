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
            // This is the Navigation Container that wraps the Tab Navigator
            // We use this for the bottom navigation bar
            // The Bottom Bar has five options: Home, Notification, List, Profile, and Cart
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            let iconPath;
                            if (route.name === 'Home') { //For the Home Screen
                                iconPath = focused //This checks if the current icon is selected/in focus
                                ? Constants.img.home1 //Icon is chosen based on choice
                                : Constants.img.home0;
                            } else if (route.name === 'Notification') { //For the Notification Screen
                                iconPath = focused
                                ? Constants.img.notif1
                                : Constants.img.notif0;
                            } else if (route.name === 'List') { //For the List Screen
                                iconPath = focused
                                ? Constants.img.list1
                                : Constants.img.list0;
                            } else if (route.name === 'Profile') { //For the Profile Screen
                                iconPath = focused 
                                ? Constants.img.profile1
                                : Constants.img.profile0;
                            }
                            return <Image source={iconPath} style={{width: 17.27, height: 16}}/>; //Returns the icon
                        },
                        headerShown: false, //Hides the header
                        tabBarShowLabel: false, //Hides the label
                        tabBarActiveTintColor: Constants.colors.primaryGreen, //Sets the active color
                        tabBarInactiveTintColor: Constants.colors.translucentBlue, //Sets the inactive color
                        })}
                    initialRouteName="Home">
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Notification" component={Notification}/>
                    <Tab.Screen name="Cart" component={Cart} //Cart Icon is placed in the middle of the cart container
                    options={{tabBarIcon: () => (<View style={styles.cartContainer}>
                        <Image source={Constants.img.cart} style={{width: 16, height: 16}}/> {/*Cart Icon is unaffected by focus/choice */}
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