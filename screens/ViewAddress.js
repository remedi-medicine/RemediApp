import React from "react";
import { StyleSheet, View, Text, FlatList, Modal, Dimensions, TouchableOpacity, Pressable, ToastAndroid, ScrollView, Image } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";
import LoadingModal from "../components/LoadingModal";
import globalStyles from "../Constants/globalStyles";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import RazorpayCheckout from "react-native-razorpay";

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

const {width, height} = Dimensions.get('window');

let Address = [];

export default class ViewAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      showLoading: true,
      selectedAddress: -1,
    }
  }

  componentDidMount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyAddress').on('value', (snapshot) => {
      snapshot.val()? Address = snapshot.val() : this.props.navigation.push("AddAddress");
      this.setState({showLoading: false});
    });
  }

  componentWillUnmount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyAddress').set(Address).then(() => {ToastAndroid.show('Address Updated', ToastAndroid.SHORT);});
  }

  renderAddress = (item, index) => {
    return(
      <>
      <TouchableOpacity style={{width: '90%', 
      borderColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.black, 
      borderRadius: 20, borderWidth: this.state.selectedAddress == index ? 3 : 1,
      alignSelf: 'center', flexDirection: 'row'}}
      onPress={() => {this.setState({selectedAddress: this.state.selectedAddress == index ? -1 : index})}}>
        <TouchableOpacity style={[styles.selectButton, 
          {borderColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.black,
          backgroundColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.white,}]}
          onPress={() => {this.setState({selectedAddress: this.state.selectedAddress == index ? -1 : index})}}/>
        <View style={{width: 0.68*width, paddingVertical: 10}}>
          <Text style={[styles.heading, {fontSize: 20}]}>{item.billTo}</Text>
          <Text style={styles.text}>{item.addressLine1}</Text>
          <Text style={styles.text}>{item.addressLine2}</Text>
          <Text style={styles.text}>{item.city} - {item.pincode}</Text>
          <Text style={styles.text}>{item.mobile}</Text>
          <Text style={styles.text}>{item.addressType}</Text>
        </View>
        <View style={{justifyContent: 'space-evenly'}}>
        <TouchableOpacity>
          <Image source={Constants.img.edit} style={{width: 20, height: 20, resizeMode: 'contain', tintColor: Constants.colors.primaryGreen}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Address.splice(index, 1); ToastAndroid.show("Address Deleted", ToastAndroid.SHORT); this.forceUpdate()}}>
          <Image source={Constants.img.delete} style={{width: 20, height: 20, resizeMode: 'contain', tintColor: Constants.colors.primaryGreen}}/>
        </TouchableOpacity>
        </View>
      </TouchableOpacity>
      </>
    );
  }

  proceedToPayment = () => {
    if(this.state.selectedAddress == -1) {
      ToastAndroid.show("Please select an address", ToastAndroid.SHORT);
      return;
    }
    this.setState({showLoading: true})
    let amount= this.props.route.params.total*100;
    let currency= "INR";
    let receipt= encodeURI("receipt_01");
    fetch(`https://remedi-order-api.onrender.com/create_order?amount=${amount}&currency=${currency}&receipt=${receipt}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      let options = {
        currency: "INR",
        key: "rzp_test_nFKekgDUCv55L4",
        amount: this.props.route.params.total*100,
        order_id: json['id'],
        prefill: {
          email: this.state.user.email,
          contact: this.state.mobile,
          name: this.state.user.displayName,
        },
        theme: {color: Constants.colors.primaryGreen},
      };
      this.setState({showLoading: false})
      RazorpayCheckout.open(options)
        .then((data) => {
          ToastAndroid.show("Payment Successful!", ToastAndroid.SHORT);
          this.props.navigation.push("AppBottomTab", {screen: "Home"});})
        .catch((error) => {
          ToastAndroid.show("Payment Failed: "+error.code+" | "+error.description, ToastAndroid.SHORT);}
        );
    })
    .catch((error) => console.log(error));
  }

  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title="Select Address" showSearch={false} onBack={() => this.props.navigation.replace("AppBottomTab", {screen: "Cart"})}/>
          <ScrollView style={{flex: 1}}>
            <View style={styles.selectTxtView}>
              <Text style={styles.heading}>Select Delivery Address</Text>
              <Text style={[styles.heading,{color: Constants.colors.primaryGreen}]} onPress={() => this.props.navigation.push("AddAddress")}>Add New</Text>
            </View>
            <FlatList
              data={Address}
              renderItem={({item, index}) => this.renderAddress(item, index)}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator
              ItemSeparatorComponent={() => <View style={{height: 20}}/>}
            />
            <Pressable style={[globalStyles.ctaButton, {marginTop: 40,}]} onPress={() => this.proceedToPayment()}>
              <Text style={globalStyles.ctaText}>Continue to Payment</Text>
            </Pressable>
            <View style={{height: 10}}/>
          </ScrollView>
        </View>
        <LoadingModal visible={this.state.showLoading}/>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: Constants.colors.primaryBlue,
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },
  text: {
    color: Constants.colors.black,
    fontSize: 16,
    fontFamily: Constants.fonts.regular,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },
  selectTxtView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 30
  },
  selectButton: {
    width: 0.05*width, 
    borderRadius: 20, 
    height: 0.05*width, 
    borderColor: Constants.colors.black, 
    borderWidth: 1, 
    alignSelf: 'center', 
    marginHorizontal:0.025*width
  },
});