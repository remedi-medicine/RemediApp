import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "../Constants/Constants";

export default class Cart extends React.Component {
    componentDidMount = () => {
        setTimeout(() => {this.props.navigation.navigate("AppBottomTab",{screen: "Home"})}, 1500);
    }

    render() {
        return(
            <>
                <View style={styles.container}>
                    <Text style={styles.text}>Register</Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        color: Constants.colors.primaryGreen,
        fontFamily: Constants.fonts.bold,
    },
});