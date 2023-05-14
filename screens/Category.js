import React from "react";
import { StyleSheet, View, Text, Modal, ToastAndroid, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import LoadingModal from "../components/LoadingModal";
import DrugCard from "../components/DrugCard";

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

let DrugList = {}, userCart = {}, Category=[];
let categoryList = [];

export default class ViewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : auth().currentUser,
      showLoading1: true,
      showLoading2: true,
      showLoading3: true,
      showSearching: false,
      categoryName: this.props.route.params.categoryName,
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
    remediData.child('Category').on('value', (snapshot) => {
      Category = snapshot.val();
      this.setState({showLoading3: false});})
    remediData.child("CategoryList").child(this.state.categoryName).on('value', (snapshot) => {
      categoryList = snapshot.val() ? snapshot.val() : [];
      this.setState({showSearching: false});})
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
        <DrugCard onPress={() => this.props.navigation.push("Product", {drugID: drugID})}
          drug={drug}
          quantity={userCart[drugID] ? userCart[drugID] : 0}
          onDelete={() => this.deleteFromCart(drugID)}
          onMinus={() => this.updateCartCount(drugID, -1)}
          onPlus={() => this.updateCartCount(drugID, +1)}
          onAdd={() => this.addToCart(drugID)}/>
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
          <Header title={this.state.categoryName} showSearch={true} onBack={() => this.props.navigation.goBack()} isSearch={false} navigation={this.props.navigation}/>
          <View style={{maxHeight: 45}}>
          <FlatList
            horizontal={true}
            data={Category}
            renderItem={({item}) =>
              <Text style={[styles.heading, {fontSize: 16, color: item.name==this.state.categoryName ? Constants.colors.black : Constants.colors.primaryGreen}]} onPress={() => item.name==this.state.categoryName ? null : this.props.navigation.replace("Category", {categoryName: item.name})}>
              {item.name}</Text>}
            style={{padding: 10}}
          /></View>
          {categoryList.length > 0 ?
            <FlatList
              data={categoryList}
              renderItem={({item}) => this.renderDrugList(item)}
              keyExtractor={item => item}
              showsVerticalScrollIndicator
              ItemSeparatorComponent={() => <View style={styles.separator}/>}
            /> :
          <Text style={{alignSelf: 'center', color: Constants.colors.centralGray, fontFamily: Constants.fonts.semibold, fontSize: 20, marginTop: 150}}>Nothing Came Up</Text>}
        </View>
        <LoadingModal visible={this.state.showLoading1 || this.state.showLoading2 || this.state.showLoading3 || this.state.showSearching}/>
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
      fontSize: 20,
      fontFamily: Constants.fonts.bold,
      color: Constants.colors.primaryBlue,
      marginHorizontal: 10,
      textAlign: 'left',
    },
    separator: {
      height: 1,
      backgroundColor: "rgba(9, 28, 63, 0.5)",
      width: '90%',
      alignSelf: "center",
    },
});