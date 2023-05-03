import React from "react";
import { StyleSheet, View, Text, Modal, ToastAndroid, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import LoadingModal from "../components/LoadingModal";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

const remediData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('RemediData');

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

let DrugList = {}, userCart = {};

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : auth().currentUser,
      showLoading1: true,
      showLoading2: true,
      showSearching: true,
      searchText: this.props.route.params.searchText,
      searchList: [],
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
      this.getSearchList();
      this.setState({showLoading2: false});})
  }

  componentWillUnmount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').set(userCart).then(() => {ToastAndroid.show('Cart Updated', ToastAndroid.SHORT);});
  }

  getSearchList = () => {
    let searchText = this.state.searchText;
    let searchList = [];
    for (let i=0; i<Object.keys(DrugList).length; i++) {
      let drugID = Object.keys(DrugList)[i];
      let drug = DrugList[drugID];
      if (drug.name.toLowerCase().includes(searchText.toLowerCase())) {
        searchList.push(drugID);
      }
      else if (drug.manufacturer.toLowerCase().includes(searchText.toLowerCase())) {
        searchList.push(drugID);
      }
      else {
        for (let i = 0; i < drug.product_info.length; i++) {
          if (drug.product_info[i].toLowerCase().includes(searchText.toLowerCase())) {
            searchList.push(drugID);
            break;
          }
        }
      }
    }
    this.setState({showSearching: false, searchList: searchList});
  }

  renderDrugList = (drugID) => {
    let drug = DrugList[drugID];
    return (
      <>
        <TouchableOpacity style={styles.drugView} onPress={() => this.props.navigation.push("Product", {drugID: drugID})}>
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
              <CartCard
                quantity={userCart[drugID]}
                onDelete={() => this.deleteFromCart(drugID)}
                onMinus={() => this.updateCartCount(drugID, -1)}
                onPlus={() => this.updateCartCount(drugID, +1)}/>
            :
              <CartCard isAdd={true} onAdd={() => this.addToCart(drugID)}/>
            }
          </View>
        </TouchableOpacity>
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
          <Header title={this.props.route.params.searchText} showSearch={true} onBack={() => this.props.navigation.goBack()} isSearch={true} navigation={this.props.navigation}/>
          {this.state.searchList.length > 0 ?
            <FlatList
              data={this.state.searchList}
              renderItem={({item}) => this.renderDrugList(item)}
              keyExtractor={item => item}
              showsVerticalScrollIndicator
              ItemSeparatorComponent={() => <View style={styles.separator}/>}
            /> :
          <Text style={{alignSelf: 'center', color: Constants.colors.centralGray, fontFamily: Constants.fonts.semibold, fontSize: 20, marginTop: 150}}>Nothing Came Up</Text>}
        </View>
        <LoadingModal visible={this.state.showLoading1 || this.state.showLoading2 || this.state.showSearching}/>
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