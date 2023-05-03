import React from "react";
import { StyleSheet, View, Text, ToastAndroid, FlatList, ScrollView, Pressable } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import DrugCard from "../components/DrugCard";
import LoadingModal from "../components/LoadingModal";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import globalStyles from "../Constants/globalStyles";

const remediData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('RemediData');

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

let DrugList = {}, userCart = {}, userTotal = 0, deliveryCharge = 0, discount = 0, total = 0;

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading1: true,
      showLoading2: true,
      user: auth().currentUser,
    };
  }

  //This function is called when this screen is rendered for the absolute first time
  componentDidMount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').orderByKey().on('value', (snapshot) => {
      snapshot.val() ? userCart = snapshot.val() : userCart = {};
      this.setState({showLoading1: false});})
    remediData.child('DrugList').on('value', (snapshot) => {
      DrugList = snapshot.val();
      this.setState({showLoading2: false});})
  }

  componentWillUnmount = () => {
    this.saveCart();
  }

  saveCart = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').set(userCart).then(() => {ToastAndroid.show('Cart Updated', ToastAndroid.SHORT);});
  }

  renderCartList = (drugID) => {
    let drug = DrugList[drugID];
    return (
      <>
      {this.state.showLoading1 || this.state.showLoading2 ? null :
        <DrugCard onPress={() => this.props.navigation.push("Product", {drugID: drugID})}
          drug={drug}
          quantity={userCart[drugID] ? userCart[drugID] : 0}
          onDelete={() => this.deleteFromCart(drugID)}
          onMinus={() => this.updateCartCount(drugID, -1)}
          onPlus={() => this.updateCartCount(drugID, +1)}
          onAdd={() => this.addToCart(drugID)}/>}
      </>
    )
  }

  deleteFromCart = (drugID) => {
    delete userCart[drugID];
    this.forceUpdate();
  }

  updateCartCount = (drugID, count) => {
    userCart[drugID] += count;
    this.forceUpdate();
  }

  getOrderTotal = () => {
    userTotal = 0;
    for (let cartCounter=0; cartCounter<Object.keys(userCart).length; cartCounter++) {
      let drugID = Object.keys(userCart)[cartCounter];
      userTotal += DrugList[drugID]?.price * userCart[drugID];
    }
    return userTotal;
  }

  getDeliveryCharges = () => {
    if (userTotal < 500) {
      deliveryCharge = 50;
    } else {
      deliveryCharge = 0;
    }
    return deliveryCharge;
  }

  getDiscount = () => {
    if (userTotal >= 1000) {
      discount = 100;
    } else {
      discount = 0;
    }
    return discount;
  }

  getTotal = () => {
    total = userTotal + deliveryCharge - discount;
    return total;
  }

  goToAddress = () => {
    this.saveCart();
    Object.keys(userCart).length == 0 ? ToastAndroid.show('Cart is Empty', ToastAndroid.SHORT) :
    this.props.navigation.push("ViewAddress", {total: this.getTotal()});
  }

  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title={"Cart"} onBack={() => this.props.navigation.goBack()} showSearch={true}/>
          <ScrollView style={{flex: 1}}>
            {Object.keys(userCart).length>0 ? <FlatList
              data={Object.keys(userCart)}
              renderItem={({item}) => this.renderCartList(item)}
              keyExtractor={item => item}
              showsVerticalScrollIndicator
              ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />: <Text style={{alignSelf: 'center', color: Constants.colors.centralGray, fontFamily: Constants.fonts.semibold, fontSize: 20, marginVertical: 50}}>Cart is Empty</Text>}
            <View style={styles.addItemsView}>
              <Text style={styles.heading}>Missing Items?</Text>
              <Text style={[styles.heading,{color: Constants.colors.primaryGreen}]} onPress={() => this.props.navigation.push("ViewDrugs")}>View All Products</Text>
            </View>
            <View style={{height: 5, width: 5, backgroundColor: Constants.colors.centralGray, alignSelf: 'center', borderRadius: 5, marginVertical: 15}}/>
            <View style={{paddingVertical: 15, width: '90%', alignSelf: 'center'}}>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.primaryGreen, fontSize: 15, marginHorizontal: 20}}>My Remedi Coins</Text>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.primaryGreen, fontSize: 15, marginHorizontal: 20}}>Balance: 0</Text>
              </View>
              <View style={{height: StyleSheet.hairlineWidth, width: '90%', backgroundColor: Constants.colors.black, alignSelf: 'center', borderRadius: 5}}/>
              <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20, textAlign: 'center'}}>4.38 Remedi coins to be earned on this order</Text>
            </View>
            <View style={{height: 5, width: 5, backgroundColor: Constants.colors.centralGray, alignSelf: 'center', borderRadius: 5, marginVertical: 15}}/>
            <View style={{paddingVertical: 10, width: '80%', alignSelf: 'center', borderColor: Constants.colors.primaryGreen, borderRadius: 20, borderWidth: 2}}>
              <Text style={styles.heading}>Bill Summary</Text>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20}}>Cart Value</Text>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20, textAlign: 'right'}}>₹{this.getOrderTotal()}</Text>
              </View>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20}}>Delivery Charges</Text>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20, textAlign: 'right'}}>₹{this.getDeliveryCharges()}</Text>
              </View>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20}}>Discount</Text>
                <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 15, marginHorizontal: 20, textAlign: 'right'}}>₹{this.getDiscount()}</Text>
              </View>
              <View style={{height: StyleSheet.hairlineWidth, width: '90%', backgroundColor: Constants.colors.black, alignSelf: 'center', borderRadius: 5}}/>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={styles.heading}>Amount to be Paid</Text>
                <Text style={styles.heading}>₹{this.getTotal()}</Text>
              </View>
            </View>
            <View style={{height: 5, width: 5, backgroundColor: Constants.colors.centralGray, alignSelf: 'center', borderRadius: 5, marginVertical: 15}}/>
            <View style={{paddingVertical: 15, width: '90%', alignSelf: 'center'}}>
              <Text style={styles.heading}>Other Details</Text>
              <Text style={{fontFamily: Constants.fonts.regular, color: Constants.colors.black, fontSize: 10, marginHorizontal: 20, textAlign: 'justify'}}>Remedi is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. For details read our terms and conditions.</Text>
            </View>
            <Pressable style={globalStyles.ctaButton} onPress={() => this.goToAddress()}>
              <Text style={globalStyles.ctaText}>Select Address</Text>
            </Pressable>
            <View style={{height: 10}}/>
          </ScrollView>
        </View>
        <LoadingModal visible={this.state.showLoading1 || this.state.showLoading2}/>
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
  heading: {
    color: Constants.colors.primaryBlue,
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(9, 28, 63, 0.5)",
    width: '90%',
    alignSelf: "center",
  },
  addItemsView: {
    borderTopColor: Constants.colors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%'
  }
});