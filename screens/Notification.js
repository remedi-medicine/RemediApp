import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

export default class Notification extends React.Component {
  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title="Notification" showSearch={false} onBack={() => this.props.navigation.goBack()}/>
          <Text style={{alignSelf: 'center', color: Constants.colors.centralGray, fontFamily: Constants.fonts.semibold, fontSize: 28, marginTop: 150}}>You Have No Notification</Text>
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