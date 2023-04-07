import React from "react";
import { StyleSheet, View, Text, FlatList, Modal, Dimensions, TouchableOpacity, Pressable, ToastAndroid, ScrollView } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import * as Progress from "react-native-progress";

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
      user: auth().currentUser,
      showLoading: true,
      selectedAddress: -1,
    }
  }

  componentDidMount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyAddress').on('value', (snapshot) => {
      Address = snapshot.val()? snapshot.val() : [];
      this.setState({showLoading: false});
    });
  }

  renderAddress = (item, index) => {
    return(
      <>
      {/* <Text style={{color: Constants.colors.primaryBlue}}>{JSON.stringify(item)}</Text> */}
      <TouchableOpacity style={{width: '90%', 
      borderColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.black, 
      borderRadius: 20, borderWidth: this.state.selectedAddress == index ? 3 : 1,
      alignSelf: 'center', flexDirection: 'row'}}
      onPress={() => {this.setState({selectedAddress: this.state.selectedAddress == index ? -1 : index})}}>
        <TouchableOpacity style={[styles.selectButton, 
          {borderColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.black,
          backgroundColor: this.state.selectedAddress == index ? Constants.colors.primaryGreen : Constants.colors.white,}]}
          onPress={() => {this.setState({selectedAddress: this.state.selectedAddress == index ? -1 : index})}}/>
        <View style={{width: 0.78*width, paddingVertical: 10}}>
          <Text style={[styles.heading, {fontSize: 20}]}>{item.billTo}</Text>
          <Text style={styles.text}>{item.addressLine1}</Text>
          <Text style={styles.text}>{item.addressLine2}</Text>
          <Text style={styles.text}>{item.city} - {item.pincode}</Text>
          <Text style={styles.text}>{item.mobile}</Text>
          <Text style={styles.text}>{item.addressType}</Text>
        </View>
      </TouchableOpacity>
      </>
    );
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
            <Pressable style={styles.continueButton} onPress={() => ToastAndroid.show('Continue to Payment', ToastAndroid.SHORT)}>
              <Text style={styles.continueText}>Continue to Payment</Text>
            </Pressable>
          </ScrollView>
        </View>
        <Modal
          visible={this.state.showLoading}
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