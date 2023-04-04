import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Constants from "../Constants/Constants";

export default class Cart extends React.Component {
  render() {
    return(
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.onBack}>
            <Image source={Constants.img.backArrow} style={styles.icons}/>
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.props.showSearch == false ? <View style={{width: 16, height: 16}}/> : 
          <TouchableOpacity onPress={this.props.onSearch}>
            <Image source={Constants.img.search} style={styles.icons}/>
          </TouchableOpacity>}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: Constants.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    color: Constants.colors.primaryGreen,
    fontFamily: Constants.fonts.bold,
    textAlign: 'center',
  },
  icons: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
});