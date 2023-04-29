import React from "react";
import {View, Text, Image, StyleSheet, Dimensions} from "react-native";

import * as Progress from "react-native-progress";

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

  componentDidMount = () => {
    user = auth().currentUser;
      if (user) {
        this.props.navigation.replace("AppBottomTab");
      } else {
        this.props.navigation.replace("Login");
      }
    return user;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Constants.img.remediLogo} style={{width: 70, height: 70}} />
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.subtitle}>{subName}</Text>
        <Progress.Bar color={Constants.colors.primaryGreen} width={Dimensions.get('screen').width*0.7} indeterminate={true}/>
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