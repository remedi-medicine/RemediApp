import React from "react";
import { StyleSheet, View, FlatList, ToastAndroid } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import DrugCard from "../components/DrugCard";
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
      snapshot.val() ? userCart = snapshot.val() : userCart = {};
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
          <Header title="All Products" onBack={() => this.props.navigation.goBack()} navigation={this.props.navigation}/>
          <FlatList
            data={Object.keys(DrugList)}
            renderItem={({item}) => this.renderDrugList(item)}
            keyExtractor={item => item}
            showsVerticalScrollIndicator
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
          />
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
  separator: {
    height: 1,
    backgroundColor: "rgba(9, 28, 63, 0.5)",
    width: '90%',
    alignSelf: "center",
  },
});