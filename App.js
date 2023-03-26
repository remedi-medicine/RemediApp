import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Constants from "./Constants/Constants";

import 'react-native-gesture-handler';

import AppBottomTab from './AppBottomTab';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Product from './screens/Product';
import ViewDrugs from './screens/ViewDrugs';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default class App extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"SplashScreen"}>
                    <Stack.Screen name="AppBottomTab" component={AppBottomTab}/>
                    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Product" component={Product}/>
                    <Stack.Screen name="ViewDrugs" component={ViewDrugs}/>
                </Stack.Navigator>
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