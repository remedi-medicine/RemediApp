import React from "react";
import {View, Text, StyleSheet} from "react-native";

import {displayName as appName, subtitle as subName} from "../app.json";
import Constants from "../Constants/Constants";

export default class SplashScreen extends React.Component {
    componentDidMount = () => {
        setTimeout(() => {this.props.navigation.replace("Login")}, 1500);
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