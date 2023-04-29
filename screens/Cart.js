import React from "react";
import { StyleSheet, View, Text, Modal, ToastAndroid, FlatList, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import * as Progress from "react-native-progress";

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
        <TouchableOpacity style={styles.drugView} onPress={() => this.props.navigation.push("Product", {drugID: drugID})}>
          <View style={styles.drugImgView}>
            <Image source={{uri: drug?.image}} style={styles.drugImg}/>
          </View>
          <View style={styles.drugTextView}>
            <Text style={styles.drugNameText} numberOfLines={1}>{drug?.name}</Text>
            <Text style={styles.drugMfgText} numberOfLines={1}>{drug?.manufacturer}</Text>
            <Text style={styles.drugPriceText} numberOfLines={1}>₹{drug?.price}</Text>
          </View>
          <View style={{position: 'absolute', bottom: 15, right: 20}}>
            <View style={[styles.cartButton, {borderColor: Constants.colors.primaryGreen, borderWidth: 1, flexDirection: 'row'}]}>
              { userCart[drugID] == 1 ?
                <TouchableOpacity onPress={() => this.deleteFromCart(drugID)}>
                  <Image source={Constants.img.delete} style={styles.cartBtnIcons}/>
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={() => this.updateCartCount(drugID, -1)}>
                  <Image source={Constants.img.minus} style={styles.cartBtnIcons}/>
                </TouchableOpacity>
              }
              <Text style={{color: Constants.colors.black, fontFamily: Constants.fonts.semibold, fontSize: 15}}>{userCart[drugID]}</Text>
              <TouchableOpacity onPress={() => this.updateCartCount(drugID, +1)}>
                <Image source={Constants.img.plus} style={styles.cartBtnIcons}/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
            <Pressable style={styles.continueButton} onPress={() => this.goToAddress()}>
              <Text style={styles.continueText}>Select Address</Text>
            </Pressable>
            <View style={{height: 10}}/>
          </ScrollView>
        </View>
        <Modal
          visible={this.state.showLoading1 || this.state.showLoading2}
          transparent={true}
          animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{justifyContent: 'center'}}>
                <Progress.CircleSnail
                  indeterminate={true}
                  size={60}
                  color={Constants.colors.primaryGreen}
                  style={{backgroundColor: 'white'}}
                  spinDuration={3000}/>
                <View style={{width: 48, height: 48, position: 'absolute', alignSelf: 'center', backgroundColor: Constants.colors.white, borderRadius: 30}}/>
              </View>
            </View>
          </View>
        </Modal>
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
  drugView: {
    width: '90%',
    alignSelf: 'center',
    height: 115,
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
  separator: {
    height: 1,
    backgroundColor: "rgba(9, 28, 63, 0.5)",
    width: '90%',
    alignSelf: "center",
  },
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
  addItemsView: {
    borderTopColor: Constants.colors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  continueButton: {
    width: '75%',
    height: 60,
    backgroundColor: Constants.colors.primaryGreen,
    borderRadius: 20,
    alignSelf: 'center',
    fontFamily: Constants.fonts.regular,
    fontSize: 16,
    color: Constants.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 20,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Constants.colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row'
  },
});