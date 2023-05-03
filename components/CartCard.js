import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from "react-native";
import Constants from "../Constants/Constants";

const {width, height} = Dimensions.get('window');

export default class CartCard extends React.Component {
  render() {
    return(
      <>
        {this.props.isAdd ?
          <TouchableOpacity style={[styles.cartButton, {backgroundColor: Constants.colors.primaryGreen}]} onPress={() => this.props.onAdd()}>
            <Text style={{color: Constants.colors.white, fontFamily: Constants.fonts.semibold, fontSize: 15,}}>Add</Text>
          </TouchableOpacity>
        :
          <View style={[styles.cartButton, {borderColor: Constants.colors.primaryGreen, borderWidth: 1, flexDirection: 'row'}]}>
            { this.props.quantity == 1 ?
              <TouchableOpacity onPress={() => this.props.onDelete()}>
                <Image source={Constants.img.delete} style={styles.cartBtnIcons}/>
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={() => this.props.onMinus()}>
                <Image source={Constants.img.minus} style={styles.cartBtnIcons}/>
              </TouchableOpacity>
            }
            <Text style={{color: Constants.colors.black, fontFamily: Constants.fonts.semibold, fontSize: 15}}>{this.props.quantity}</Text>
            <TouchableOpacity onPress={() => this.props.onPlus()}>
              <Image source={Constants.img.plus} style={styles.cartBtnIcons}/>
            </TouchableOpacity>
          </View>
        }
      </>
    )
  }
}

const styles=StyleSheet.create({
  cartButton: {
    width: 80,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnIcons: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginHorizontal: 15
  },
})
