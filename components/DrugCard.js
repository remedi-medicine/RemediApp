import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from "react-native";
import Constants from "../Constants/Constants";
import CartCard from "../components/CartCard";

const {width, height} = Dimensions.get('window');

export default class DrugCard extends React.Component {
  render() {
    return(
      <>
        <TouchableOpacity style={styles.drugView} onPress={() => this.props.onPress()}>
          <View style={styles.drugImgView}>
            <Image source={{uri: this.props.drug.image}} style={styles.drugImg}/>
          </View>
          <View style={styles.drugTextView}>
            <Text style={styles.drugNameText} numberOfLines={2}>{this.props.drug.name}</Text>
            <Text style={styles.drugMfgText} numberOfLines={1}>{this.props.drug.manufacturer}</Text>
            <Text style={styles.drugPriceText} numberOfLines={1}>₹{this.props.drug.price}</Text>
          </View>
          <View style={{position: 'absolute', bottom: 25, right: 20}}>
            { this.props.quantity > 0 ? 
              <CartCard
                quantity={this.props.quantity}
                onDelete={() => this.props.onDelete()}
                onMinus={() => this.props.onMinus()}
                onPlus={() => this.props.onPlus()}/>
            :
              <CartCard isAdd={true} onAdd={() => this.props.onAdd()}/>
            }
          </View>
        </TouchableOpacity>
      </>
    )
  }
}

const styles = StyleSheet.create({
  drugView: {
    width: '90%',
    alignSelf: 'center',
    height: 150,
    flex: 1,
    flexDirection: 'row',
  },
  drugImgView: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  drugImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  drugTextView: {
    width: '70%',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  drugNameText: {
    color: Constants.colors.black,
    fontFamily: Constants.fonts.bold,
    fontSize: 16
  },
  drugMfgText: {
    color: Constants.colors.black,
    fontFamily: Constants.fonts.light,
    fontSize: 12
  },
  drugPriceText: {
    color: Constants.colors.primaryGreen,
    fontFamily: Constants.fonts.bold,
    fontSize: 16
  },
})