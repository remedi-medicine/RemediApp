import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "../Constants/Constants";

export default class Profile extends React.Component {
    render() {
        return(
            <>
                <View style={styles.container}>
                    <Text style={styles.text}>Profile</Text>
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