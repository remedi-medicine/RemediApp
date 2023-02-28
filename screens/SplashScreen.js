import React from "react";
import {View, Text, StyleSheet} from "react-native";

import auth from '@react-native-firebase/auth';

import {displayName as appName, subtitle as subName} from "../app.json";
import Constants from "../Constants/Constants";

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    onAuthStateChanged = (user) => {
        this.setState({user: user});
        if (user) {
            this.props.navigation.replace("AppBottomTab");
        } else {
            this.props.navigation.replace("Login");
        }
        return user;
    }

    componentDidMount = () => {
        const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
        // setTimeout(() => {this.props.navigation.replace("Login")}, 1500);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{appName}</Text>
                <Text style={styles.subtitle}>{subName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: Constants.fonts.bold,
        color: Constants.colors.primaryGreen,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: Constants.fonts.regular,
        color: Constants.colors.primaryGreen,
    },
});