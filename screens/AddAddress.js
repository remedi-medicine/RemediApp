import React from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Dimensions, TouchableOpacity, Pressable, Alert, ToastAndroid } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

const {width, height} = Dimensions.get('window');
let Address = [];

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billTo: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      pincode: '',
      mobile: '',
      addressType: '',
      user: auth().currentUser,
      showBlank: false,
    }
  }

  componentDidMount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyAddress').on('value', (snapshot) => {
      Address = snapshot.val()? snapshot.val() : [];
    });
  }

  saveAddress = () => {
    if(this.state.billTo == '' || this.state.addressLine1 == '' ||
    this.state.addressLine2 == '' || this.state.city == '' ||
    this.state.pincode == '' || this.state.mobile == '' || this.state.addressType == '') {
      Alert.alert('Incomplete Data', 'Please fill all the fields');
    }
    else {
      let user = this.state.user;
      let uid = user.uid;
      let newAddress = {
        billTo: this.state.billTo,
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        city: this.state.city,
        pincode: this.state.pincode,
        mobile: this.state.mobile,
        addressType: this.state.addressType,
      }
      Address.push(newAddress);
      userData.child(uid).child('MyAddress').set(Address).then(() => {
        ToastAndroid.show('Address Added', ToastAndroid.SHORT);
        this.props.navigation.push("ViewAddress");
      });
    }
  }

  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title={"Add Address"} onBack={() => this.props.navigation.goBack()} showSearch={false}/>
          <ScrollView style={styles.container}>
            <Text style={styles.heading}><Text>Bill To:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={this.state.billTo}
              placeholder="Bill To"
              placeholderTextColor={Constants.colors.centralGray}
              autoComplete='name'
              onChangeText={(newBillTo) => this.setState({billTo: newBillTo})}
            />
            <Text style={styles.heading}><Text>Address:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={this.state.addressLine1}
              placeholder="House No & Building Name"
              placeholderTextColor={Constants.colors.centralGray}
              onChangeText={(newAddressLine1) => this.setState({addressLine1: newAddressLine1})}
            />
            <TextInput
              style={styles.input}
              value={this.state.addressLine2}
              placeholder="Street Name & Area"
              placeholderTextColor={Constants.colors.centralGray}
              onChangeText={(newAddressLine2) => this.setState({addressLine2: newAddressLine2})}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40}}>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={[styles.heading,{marginStart: 0}]}><Text>City:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
                <TextInput
                  style={[styles.input, {width: 0.35*width}]}
                  value={this.state.city}
                  placeholder="City"
                  placeholderTextColor={Constants.colors.centralGray}
                  onChangeText={(newCity) => this.setState({city: newCity})}
                />
              </View>
              <View style={{alignSelf: 'flex-end'}}>
                <Text style={[styles.heading,{marginStart: 0}]}><Text>Pincode:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
                <TextInput
                  style={[styles.input, {width: 0.35*width,}]}
                  value={this.state.pincode}
                  placeholder="Pincode"
                  autoComplete="postal-code"
                  placeholderTextColor={Constants.colors.centralGray}
                  onChangeText={(newPincode) => this.setState({pincode: newPincode})}
                />
              </View>
            </View>
            <Text style={styles.heading}><Text>Mobile Number:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={this.state.mobile}
              placeholder="Mobile Number"
              autoComplete="tel-device"
              placeholderTextColor={Constants.colors.centralGray}
              onChangeText={(newMobile) => this.setState({mobile: newMobile})}
            />
            <Text style={styles.heading}><Text>Address Type:</Text><Text style={{color: Constants.colors.red}}>*</Text></Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 0.85*width, alignSelf: 'center'}}>
              <TouchableOpacity style={[styles.cartButton, 
                {backgroundColor: this.state.addressType == "Home" ? Constants.colors.primaryGreen : Constants.colors.white}]}
                onPress={() => this.setState({addressType: "Home"})}>
                  <Text 
                  style={{color: this.state.addressType == "Home" ? Constants.colors.white : Constants.colors.black, fontFamily: Constants.fonts.semibold, fontSize: 15,}}>
                    Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cartButton, 
                {backgroundColor: this.state.addressType == "Office" ? Constants.colors.primaryGreen : Constants.colors.white}]}
                onPress={() => this.setState({addressType: "Office"})}>
                  <Text 
                  style={{color: this.state.addressType == "Office" ? Constants.colors.white : Constants.colors.black, fontFamily: Constants.fonts.semibold, fontSize: 15,}}>
                    Office</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cartButton, 
                {backgroundColor: this.state.addressType == "Other" ? Constants.colors.primaryGreen : Constants.colors.white}]}
                onPress={() => this.setState({addressType: "Other"})}>
                  <Text 
                  style={{color: this.state.addressType == "Other" ? Constants.colors.white : Constants.colors.black, fontFamily: Constants.fonts.semibold, fontSize: 15,}}>
                    Other</Text>
              </TouchableOpacity>
            </View>
            <Pressable style={styles.continueButton} onPress={() => this.saveAddress()}>
              <Text style={styles.continueText}>Save & Continue</Text>
            </Pressable>
          </ScrollView>
        </View>
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
    marginHorizontal: 40,
    marginTop: 20,
  },
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
  cartButton: {
    width: 80,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Constants.colors.primaryGreen,
    borderWidth: 1,
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
    marginTop: 40,
  },
  continueText: {
    fontSize: 20,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.white,
  },
});