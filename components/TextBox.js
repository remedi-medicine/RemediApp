import React from "react";
import { StyleSheet, Dimensions, TextInput } from "react-native";
import Constants from "../Constants/Constants";

const {width, height} = Dimensions.get('window');

export default class Cart extends React.Component {
  render() {
    return(
      <>
        <TextInput
          style={[styles.input, this.props.style]}
          value={this.props.value}
          placeholder={this.props.placeholder}
          placeholderTextColor={Constants.colors.centralGray}
          autoComplete={this.props.autoComplete}
          onChangeText={this.props.onChangeText}
          editable={this.props.editable}
        />
      </>
    )
  }
}

const styles=StyleSheet.create({
  input: {
    width: 0.85*width,
    height: 50,
    backgroundColor: Constants.colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 5,
    paddingStart: 20,
    fontFamily: Constants.fonts.regular,
    fontSize: 16,
    color: Constants.colors.black,
    borderWidth: 1,
    borderColor: Constants.colors.primaryGreen,
  },
})
