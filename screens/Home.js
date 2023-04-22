import React, { useCallback } from "react";
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, FlatList, TextInput, Modal, PermissionsAndroid, Alert, RefreshControl } from "react-native";
import { Dimensions } from "react-native";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import * as Progress from "react-native-progress";
import Geolocation from 'react-native-geolocation-service';

import {displayName as appName, subtitle as subName} from "../app.json";
import Constants from "../Constants/Constants";
import Category from "../Constants/Category";

const { width, height } = Dimensions.get("window");

const remediData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('RemediData');

let DrugList = {};

export default class Home extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      deal: [],
      showLoading1: true,
      showLoading2: true,
      refreshing: false,
      searchText: '',
    },
    this.category = [
      require('../assets/images/dental.png'),
      require('../assets/images/wellness.png'),
      require('../assets/images/homeo.png'),
      require('../assets/images/eyecare.png'),
      require('../assets/images/skinhair.png'),
    ]
  }

  componentDidMount = () => {
    remediData.child('DrugList').on('value', (snapshot) => {
      DrugList = snapshot.val();
      this.setState({showLoading1: false});
    });
    
    remediData.child('Deals').once('value').then(snapshot => {
      this.setState({deal: snapshot.val(), showLoading2: false});
    });

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
      granted ? this._getCurrentLocation() :
        (
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
            granted ? this._getCurrentLocation()
            : Alert.alert('Location Permission Denied','Please enable location permission to use this app')
          }).catch(err => {
            console.warn(err);})
        )
      });
    }

  //This function gets the data from the database
  _getData = () => {
    remediData.child('DrugList').on('value', (snapshot) => {
      DrugList = snapshot.val();
      this.setState({showLoading1: false});
    });
    
    remediData.child('Deals').once('value').then(snapshot => {
      this.setState({deal: snapshot.val(), showLoading2: false});
    });
  }

  _getCurrentLocation = () => {
    let latitude=0, longitude=0;
    Geolocation.getCurrentPosition(
      position => {
        latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        console.log("GeoLocation: ", latitude, longitude)
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bf089be2d5324c1da0876446fff7d004`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              suburb: data.results[0].components.suburb,
              city: data.results[0].components.city,
              state: data.results[0].components.state,
              country: data.results[0].components.country,
              postcode: data.results[0].components.postcode,
              formatted: data.results[0].formatted,
            });
          })                
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }

  //This function renders the categories
  //Function is called by FlatList
  renderCategories = (item, index) => {
    return (
      <TouchableOpacity style={styles.category}>{/*This marks a clickable outline for the category names*/}
        <View style={[styles.categoryCircle,{backgroundColor: item.background}]}>{/*This renders the category circle with a specified background colour*/}
          <Image source={this.category[index]} style={styles.categoryIcon}/>{/*This renders the category icon*/}
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  //This function renders the banner
  //Function is called by FlatList
  renderBanner = (item, index) => {
    return (
      <Image source={item} style={styles.bannerImage}/>//This renders the banner image
    );
  }

  //This function renders the deals of the day
  //Function is called by FlatList
  renderDeal = (dealDrugID, index) => {
    let drug = DrugList[dealDrugID];
    return (
      <TouchableOpacity style={styles.deal} onPress={() => {this.props.navigation.navigate("Product", {drugID: dealDrugID})}}>{/*This marks a clickable outline for the deal*/}
        <View style={styles.dealImageView}>
          <Image source={{uri: drug?.image}} style={styles.dealImage}/>{/*This renders the deal image*/}
        </View>
        <View style={styles.dealText}>
          <Text style={styles.dealTitle} numberOfLines={2}>{drug?.name}</Text>{/*This renders the deal title*/}
          <Text style={styles.dealPrice}>₹ {drug?.price}</Text>{/*This renders the deal price*/}
        </View>
        <View style={styles.viewDealRating}>
          <Text style={styles.dealRating}>{drug?.rating}</Text>{/*This renders the deal rating*/}
        </View>
      </TouchableOpacity>
    );
  }

  //This function renders all the available drugs
  //Function is called by FlatList
  renderAllDrugs = (drugID, index) => {
    item = DrugList[drugID];
    return (
      <TouchableOpacity style={styles.deal} onPress={() => {this.props.navigation.push("Product", {drugID: drugID})}}>{/*This marks a clickable outline for the drug*/}
        <View style={styles.dealImageView}>
          <Image source={{uri: item.image}} style={styles.dealImage}/>{/*This renders the drug image*/}
        </View>
        <View style={styles.dealText}>
          <Text style={styles.dealTitle} numberOfLines={2}>{item.name}</Text>{/*This renders the drug name*/}
          <Text style={styles.dealPrice}>₹ {item.price}</Text>{/*This renders the drug price*/}
        </View>
        <View style={styles.viewDealRating}>
          <Text style={styles.dealRating}>{item.rating}</Text>{/*This renders the drug rating*/}
        </View>
      </TouchableOpacity>
    );
  }

  //This is the main render function
  //It contains all the elements that are to be rendered on the screen
  render() {
    return (
      <>
        <StatusBar backgroundColor={Constants.colors.primaryGreen} barStyle={'dark-content'}/>{/*Makes the Status Bar colour PrimaryGreen & Text in White*/}
        <ScrollView style={styles.container}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start',}}>{/*ScrollView is chosen so that multiple elements aren't hidden and user can scroll through the homepage */}
          <View style={styles.welcome}>{/*This is the welcome section of the homepage*/}
            <View style={styles.semicircle}/>
              <TouchableOpacity style={styles.cart} onPress={() => this.props.navigation.navigate("Cart")}>{/*This marks a clickable outline for the cart icon*/}
                <Image source={Constants.img.cart} style={{width: 20, height: 20}}/>{/*This renders the cart icon*/}
              </TouchableOpacity>
              <TouchableOpacity  style={{width: 45, height: 65}} onPress={() => this.props.navigation.navigate("Profile")}>{/*This marks a clickable outline for the profile icon*/}
                <Image source={Constants.img.profile} style={styles.profile}/>{/*This renders the profile icon*/}
              </TouchableOpacity>
              <Text style={styles.welcomeText}>Hi, {this.state.user.displayName}</Text>{/*This renders the welcome text along with name of user*/}
              <Text style={styles.welcomeSubText}>{this.state.suburb}, {this.state.city} - {this.state.postcode}</Text>{/*This renders the location of the user*/}
              <TouchableOpacity style={styles.search}>{/*This marks a clickable outline for the search bar*/}
                <Image source={Constants.img.search} style={styles.searchIcon}/>{/*This renders the search icon*/}
                <TextInput style={styles.searchText} placeholder="Search Medicines & Healthcare Products" placeholderTextColor={Constants.colors.translucentBlue} value={this.state.searchText} onChangeText={(newSearchText) => this.setState({searchText: newSearchText})} onSubmitEditing={() => this.props.navigation.navigate("Search", {searchText: this.state.searchText})}></TextInput>{/*This renders the search text*/}
              </TouchableOpacity>
            </View>
            <Text style={[styles.heading, {marginTop: 24}]}>
              Top Categories
            </Text>
            {/*This creates a flatlist of category names*/}
            <FlatList
              horizontal//This makes the list horizontal instead of vertical
              data={Category}//This is the data that is to be rendered
              style={{marginTop: 8, marginHorizontal: 15, minHeight: 100,}}//This is the style of the flatlist
              renderItem={({item, index}) => (this.renderCategories(item, index))}/>{/*This calls the renderCategories function to render the categories*/}
            {/*This creates a flatlist of banner images*/}
            <FlatList
              horizontal
              data={Constants.img.banner}
              style={{marginTop: 24}}
              renderItem={({item, index}) => (this.renderBanner(item, index))}/>
                    
            <Text style={[styles.heading, {marginTop: 24}]}>
              Deals of the Day
            </Text>
            {/*This creates a flatlist of deals of the day*/}
            <FlatList
              horizontal
              data={this.state.deal}
              style={{marginTop: 8, marginHorizontal: 15, minHeight: 275}}
              renderItem={({item, index}) => (this.renderDeal(item, index))}/>
            
            <View style={{width: '100%'}}>
              <Text style={[styles.heading, {marginTop: 24}]}>
                All Products at {appName}
              </Text>
              <Text style={[styles.heading, {marginTop: 24, color: Constants.colors.primaryGreen, position: 'absolute', right: 20}]}
                onPress={() => this.props.navigation.navigate("ViewDrugs")}>
                View All
              </Text>
            </View>
            {/*This creates a flatlist of all available drugs*/}
            <FlatList
              horizontal
              data={Object.keys(DrugList).slice(5)}
              style={{marginTop: 8, marginHorizontal: 15, minHeight: 275}}
              renderItem={({item, index}) => (this.renderAllDrugs(item, index))}/>
            <View style={{height: 100}}/>
        </ScrollView>
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
    backgroundColor: '#fff',
  },
  title: {
    color: Constants.colors.primaryGreen,
    fontSize: 20,
    fontFamily: Constants.fonts.bold,
  },
  subtitle: {
    color: Constants.colors.primaryGreen,
    fontSize: 15,
    fontFamily: Constants.fonts.light,
  },
  names: {
    color: Constants.colors.primaryGreen,
    fontSize: 12,
    fontFamily: Constants.fonts.regular,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  welcome: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 193,
    maxHeight: 193,
    width: '100%',
    backgroundColor: Constants.colors.primaryGreen,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingStart: 35,
  },
  semicircle: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 300,
    height: 412,
    width: 412,
    top: 17,
    left: -211,
    opacity: 0.1,
  },
  cart: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 20,
    right: 20,
  },
  profile: {
    marginTop: 20,
    height: 45,
    width: 45,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontFamily: Constants.fonts.bold,
  },
  welcomeSubText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Constants.fonts.light,
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    width: '80%',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchIcon: {
    height: 15,
    width: 15,
    marginStart: 15,
  },
  searchText: {
    color: Constants.colors.primaryGreen,
    fontSize: 13,
    fontFamily: Constants.fonts.regular,
    marginStart: 5,
  },
  heading: {
    color: Constants.colors.primaryBlue,
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-start',
    marginStart: 20,
  },
  category: {
    height: 98,
    width: 64,
    backgroundColor: 'white',
    borderRadius: 32,
    elevation: 3,
    alignContent: 'center',
    marginHorizontal: 5,
  },
  categoryCircle: {
    height: 48,
    width: 48,
    borderRadius: 100,
    backgroundColor: Constants.colors.primaryGreen,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  categoryIcon: {
    height: 16,
    width: 16,
  },
  categoryText: {
    color: Constants.colors.primaryBlue,
    fontSize: 11,
    fontFamily: Constants.fonts.light,
    marginTop: 5,
    textAlign: 'center',
  },
  bannerImage: {
    width: width*0.90,
    height: width*0.45,
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  deal: {
    width: 180,
    height: 270,
    marginHorizontal: 17,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  dealImageView: {
    width: 180,
    height: 180,
    borderRadius: 10,
    backgroundColor: '#EEEEF0',
    justifyContent: 'center',
  },
  dealImage: {
    width: 109,
    height: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  dealTitle: {
    color: Constants.colors.primaryBlue,
    fontSize: 13,
    fontFamily: Constants.fonts.regular,
    marginStart: 10,
    width: 109,
    marginTop: 10,
  },
  dealPrice: {
    color: Constants.colors.primaryBlue,
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    marginStart: 10,
    marginTop: 5,
  },
  viewDealRating: {
    width: 48,
    height: 24,
    backgroundColor: '#FFC000',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 13,
    justifyContent: 'center',
  },
  dealRating: {
    color: 'white',
    fontSize: 13,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-end',
    marginEnd: 10,
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