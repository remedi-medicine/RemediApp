import React from "react";
import { StyleSheet, View, Text, FlatList, Modal, Image, TouchableOpacity, ToastAndroid } from "react-native";
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

let DrugList = {}, userCart = {};

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : auth().currentUser,
      showLoading1: true,
      showLoading2: true,
    };
  }

  //This function is called when this screen is rendered for the absolute first time
  componentDidMount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').orderByKey().on('value', (snapshot) => {
      userCart = snapshot.val();
      this.setState({showLoading1: false});})
    remediData.child('DrugList').on('value', (snapshot) => {
      DrugList = snapshot.val();
      this.setState({showLoading2: false});})
  }

  componentWillUnmount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').set(userCart).then(() => {ToastAndroid.show('Cart Updated', ToastAndroid.SHORT);});
  }

  renderDrugList = (drugID) => {
    let drug = DrugList[drugID];
    return (
      <>
        <View style={styles.drugView}>
          <View style={styles.drugImgView}>
            <Image source={{uri: drug.image}} style={styles.drugImg}/>
          </View>
          <View style={styles.drugTextView}>
            <Text style={styles.drugNameText} numberOfLines={2}>{drug.name}</Text>
            <Text style={styles.drugMfgText} numberOfLines={1}>{drug.manufacturer}</Text>
            <Text style={styles.drugPriceText} numberOfLines={1}>₹{drug.price}</Text>
          </View>
          <View style={{position: 'absolute', bottom: 25, right: 20}}>
            { userCart[drugID] ? 
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
            :
              <TouchableOpacity style={[styles.cartButton, {backgroundColor: Constants.colors.primaryGreen}]} onPress={() => this.addToCart(drugID)}>
                <Text style={{color: Constants.colors.white, fontFamily: Constants.fonts.semibold, fontSize: 15,}}>Add</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </>
    )
  }

  addToCart = (drugID) => {
    userCart[drugID] = 1;
    this.forceUpdate();
  }

  deleteFromCart = (drugID) => {
    delete userCart[drugID];
    this.forceUpdate();
  }

  updateCartCount = (drugID, count) => {
    userCart[drugID] += count;
    this.forceUpdate();
  }

  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title="All Products" onBack={() => this.props.navigation.goBack()}/>
          <FlatList
            data={Object.keys(DrugList)}
            renderItem={({item}) => this.renderDrugList(item)}
            keyExtractor={item => item}
            showsVerticalScrollIndicator
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
          />
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