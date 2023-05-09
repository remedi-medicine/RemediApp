import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid, FlatList, Dimensions } from "react-native";
import Constants from "../Constants/Constants";
import Header from "../components/Header";

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import { AirbnbRating } from "react-native-ratings";
import * as Progress from "react-native-progress";
import Geolocation from 'react-native-geolocation-service';
import CartCard from "../components/CartCard";

const remediData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('RemediData');

const userData = firebase
  .app()
  .database('https://remedi---instant-medicine-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref('UserData');

let userCart = {};
const { width, height } = Dimensions.get('window');

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      drugID: this.props.route.params.drugID,
      drug: {},
      city: 'xxxxxx',
      postcode: '000000',
      showProductInfo: true,
    };
  }

  componentDidMount = () => {
    this._getCurrentLocation();
    remediData.child('DrugList').child(this.state.drugID).on('value', (snapshot) => {
      this.setState({drug: snapshot.val()});
    });
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').orderByKey().on('value', (snapshot) => {
      snapshot.val() ? userCart = snapshot.val() : userCart = {};
    });
  }

  componentWillUnmount = () => {
    let user = this.state.user;
    let uid = user.uid;
    userData.child(uid).child('MyCart').set(userCart).then(() => {ToastAndroid.show('Cart Updated', ToastAndroid.SHORT);});
  }

  _getCurrentLocation = () => {
    let latitude=0, longitude=0;
    Geolocation.getCurrentPosition(
      position => {
        latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bf089be2d5324c1da0876446fff7d004`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              city: data.results[0].components.city,
              postcode: data.results[0].components.postcode,
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

  getDifference = () => {
    let difference = this.state.drug.mrp - this.state.drug.price;
    let percentage = (difference / this.state.drug.mrp) * 100;
    return percentage>0 ? `${percentage.toFixed(0)}% off` : '';
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

  renderReview = (review, reviewIndex) => {
    return(
      <>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 40, height: 40, borderRadius: 41, backgroundColor: Constants.colors.centralGray, justifyContent: 'center'}}>
            <Text style={{fontFamily: Constants.fonts.bold, fontSize: 30, color: Constants.colors.primaryBlue, alignSelf: 'center', top: -5}}>{review.postedby.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{fontFamily: Constants.fonts.bold, fontSize: 16, color: Constants.colors.primaryBlue}}>{review.postedby}</Text>
            <Text style={{fontFamily: Constants.fonts.light, fontSize: 10, color: Constants.colors.black}}>{review.postedat}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'flex-start', marginVertical: 5}}>
        <AirbnbRating
          count={5}
          defaultRating={review.rating}
          size={14}
          isDisabled={true}
          selectedColor={Constants.colors.primaryGreen}
          showRating={false}
        /></View>
        <Text style={{fontFamily: Constants.fonts.regular, fontSize: 12, color: Constants.colors.black}}>{review.review}</Text>
      </>
    );
  }

  render() {
    return(
      <>
        <View style={styles.container}>
          <Header title={this.state.drug.name} showSearch={false} onBack={() => this.props.navigation.goBack()}/>
          <ScrollView style={[styles.container, {padding: 20, paddingTop:10}]} contentContainerStyle={{alignItems: 'flex-start'}}>
            <Image source={{uri: this.state.drug.image}} style={styles.image}/>
            <Text style={styles.name}>{this.state.drug.name}</Text>
            <Text style={styles.manufacturer}>By {this.state.drug.manufacturer}</Text>
            <View style={{marginHorizontal: 10, flexDirection: 'row', marginVertical: 10}}>
              <AirbnbRating
                count={5}
                defaultRating={this.state.drug.rating}
                size={20}
                isDisabled={true}
                selectedColor={Constants.colors.primaryGreen}
                showRating={false}
              />
              <Text style={{fontSize: 16, fontFamily: Constants.fonts.regular, color: Constants.colors.primaryGreen, marginHorizontal: 10}}>({this.state.drug.totalRatings} Ratings)</Text>
            </View>
            <View style={{marginHorizontal: 10, flexDirection: 'row', width: '100%'}}>
              <Text style={styles.price}>₹{this.state.drug.price}</Text>
              {this.state.drug.mrp != this.state.drug.price ? <Text style={styles.mrp}>₹{this.state.drug.mrp}</Text> : null}
              <Text style={styles.difference}>{this.getDifference()}</Text>
              <View style={{alignSelf: 'center', position: 'absolute', right: 20,}}>
                {userCart[this.state.drugID] ? 
                  <CartCard
                    quantity={userCart[this.state.drugID]}
                    onDelete={() => this.deleteFromCart(this.state.drugID)}
                    onMinus={() => this.updateCartCount(this.state.drugID, -1)}
                    onPlus={() => this.updateCartCount(this.state.drugID, +1)}  
                  />
                :
                  <CartCard isAdd={true} onAdd={() => this.addToCart(drugID)}/>
                }
              </View>
            </View>
            <View style={{height: 5, width: 5, backgroundColor: Constants.colors.centralGray, alignSelf: 'center', borderRadius: 5, marginVertical: 15}}/>
            <Text style={styles.deliveryHeading}><Text>Earliest Delivery by </Text><Text style={{color: Constants.colors.primaryGreen}}>Today, 07:00 PM</Text></Text>
            <Text style={styles.deliveryText}>Delivering To: {this.state.postcode}, {this.state.city}</Text>
            <View style={{height: 5, width: 5, backgroundColor: Constants.colors.centralGray, alignSelf: 'center', borderRadius: 5, marginVertical: 15}}/>
            <View style={{justifyContent: 'space-evenly', alignContent: 'center', width: '100%', flexDirection: 'row'}}>
              <View>
                <Image source={Constants.img.genuine} style={styles.guaranteeIcon}/>
                <Text style={styles.guaranteeText}>100% Genuine Products</Text>
              </View>
              <View>
                <Image source={Constants.img.safe} style={styles.guaranteeIcon}/>
                <Text style={styles.guaranteeText}>Safe & Secure Payments</Text>
              </View>
              <View>
                <Image source={Constants.img.contactless} style={styles.guaranteeIcon}/>
                <Text style={styles.guaranteeText}>Contactless Delivery</Text>
              </View>
              <View>
                <Image source={Constants.img.sanitised} style={styles.guaranteeIcon}/>
                <Text style={styles.guaranteeText}>Fully Sanitised Facilities</Text>
              </View>
            </View>
            <View style={styles.roundSeparator}/>
            <TouchableOpacity style={{justifyContent: 'space-between', width: '100%', flexDirection: 'row'}} onPress={() => this.setState({showProductInfo: !this.state.showProductInfo})}>
              <Text style={styles.heading}>PRODUCT INFORMATION</Text>
              <Image source={this.state.showProductInfo ? Constants.img.upArrow: Constants.img.downArrow} style={styles.headingArrow}/>
            </TouchableOpacity>
            {this.state.showProductInfo && <><FlatList
              data={this.state.drug.product_info}
              renderItem={({item, index}) => <Text style={[styles.productInfo, {fontFamily: this.state.drug.product_info[index-1]==" "? Constants.fonts.bold:Constants.fonts.regular}]}>{item}</Text>}
              keyExtractor={item => item}/>
              { this.state.drug.category ? <>
              <Text style={[styles.heading, {fontSize: 16, marginTop: 10}]}>Category: </Text>
              {this.state.drug.category?.map((categoryName, index) => {
                return (
                    <Text style={[styles.heading, {fontSize: 16, color: Constants.colors.primaryGreen}]} onPress={() => this.props.navigation.push("Category", {categoryName: categoryName})}>
                      {categoryName}</Text>)})}</>
              : null}
              </>}
            <View style={styles.roundSeparator}/>
            <Text style={styles.heading}>CUSTOMER REVIEWS</Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: Constants.fonts.bold, fontSize: 15, color: Constants.colors.black, marginHorizontal: 10}}><Text style={{fontSize: 30}}>{this.state.drug.rating}</Text>/5</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={this.state.drug.rating}
                  size={14}
                  isDisabled={true}
                  selectedColor={Constants.colors.primaryGreen}
                  showRating={false}
                />
                <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.totalRatings} Ratings</Text>
              </View>
              <View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10, width: 6, textAlign: 'right'}}>5</Text>
                  <Progress.Bar progress={this.state.drug.starRating ? this.state.drug.starRating[5]/100: 0} color={Constants.colors.primaryGreen} style={{height: 7, alignSelf: 'center'}}/>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.starRating ? this.state.drug.starRating[5]: 0}%</Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10, width: 6, textAlign: 'right'}}>4</Text>
                  <Progress.Bar progress={this.state.drug.starRating ? this.state.drug.starRating[4]/100: 0} color={Constants.colors.primaryGreen} style={{height: 7, alignSelf: 'center'}}/>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.starRating ? this.state.drug.starRating[4]: 0}%</Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10, width: 6, textAlign: 'right'}}>3</Text>
                  <Progress.Bar progress={this.state.drug.starRating ? this.state.drug.starRating[3]/100: 0} color={Constants.colors.primaryGreen} style={{height: 7, alignSelf: 'center'}}/>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.starRating ? this.state.drug.starRating[3]: 0}%</Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10, width: 6, textAlign: 'right'}}>2</Text>
                  <Progress.Bar progress={this.state.drug.starRating ? this.state.drug.starRating[2]/100: 0} color={Constants.colors.red} style={{height: 7, alignSelf: 'center'}}/>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.starRating ? this.state.drug.starRating[2]: 0}%</Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10, width: 6, textAlign: 'right'}}>1</Text>
                  <Progress.Bar progress={this.state.drug.starRating ? this.state.drug.starRating[1]/100: 0} color={Constants.colors.red} style={{height: 7, alignSelf: 'center'}}/>
                  <Text style={{fontSize: 10, fontFamily: Constants.fonts.light, color: Constants.colors.black, marginHorizontal: 10}}>{this.state.drug.starRating ? this.state.drug.starRating[1]: 0}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.separator}/>
            <Text style={[styles.heading, {fontSize: 16}]}>Top Reviews</Text>
            <FlatList
              style={{width: '100%'}}
              data={this.state.drug.reviews}
              renderItem={({item, index}) => (<View style={{width: '100%', borderRadius: 20, borderColor: Constants.colors.primaryBlue, borderWidth: StyleSheet.hairlineWidth, padding: 10, alignSelf: 'center'}}>
              {this.renderReview(item, index)}</View>)}
              keyExtractor={({item, index}) => index}
              ItemSeparatorComponent={() => <View style={{height: 10}}/>}
            />
            <View style={styles.roundSeparator}/>
            <Text style={[styles.productInfo, {fontFamily: Constants.fonts.bold}]}>Manufacturer/Marketer Address</Text>
            <Text style={styles.productInfo}>{this.state.drug.mfgAddress}</Text>
            <Text style={styles.productInfo}>Country of Origin: {this.state.drug.origin}</Text>
            <Text style={styles.productInfo}>Expires on or after: <Text style={{fontFamily: Constants.fonts.bold}}>{this.state.drug.expiry}</Text></Text>
            <Text style={[styles.productInfo, {marginTop: 10, fontFamily: Constants.fonts.bold}]}>
              A licensed vendor partner from your nearest location will deliver {this.state.drug.name}.
              Once the pharmacy accepts your order, the details of the pharmacy will be shared with you.
              Acceptance of your order is based on the validity of your doctor's ℞ and the availability of this medicine.
            </Text>
            <View style={{height: 20}}/>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: Constants.colors.centralGray,

  },
  name: {
    fontSize: 20,
    color: Constants.colors.primaryBlue,
    fontFamily: Constants.fonts.bold,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  manufacturer: {
    fontSize: 12,
    color: Constants.colors.black,
    fontFamily: Constants.fonts.light,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 24,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.primaryBlue,
    marginHorizontal: 10
  },
  mrp: {
    fontSize: 18,
    fontFamily: Constants.fonts.regular,
    color: Constants.colors.centralGray,
    textDecorationLine: 'line-through',
    alignSelf: 'center'
  },
  difference: {
    fontSize: 16,
    fontFamily: Constants.fonts.regular,
    color: Constants.colors.primaryGreen,
    marginHorizontal: 10,
    alignSelf: 'center',
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
  deliveryHeading: {
    fontSize: 16,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.primaryBlue,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  deliveryText: {
    fontSize: 14,
    fontFamily: Constants.fonts.regular,
    color: Constants.colors.black,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  guaranteeIcon: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  guaranteeText: {
    fontSize: 12,
    fontFamily: Constants.fonts.regular,
    color: Constants.colors.black,
    alignSelf: 'center',
    textAlign: 'center',
    width: 80,
  },
  heading: {
    fontSize: 20,
    fontFamily: Constants.fonts.bold,
    color: Constants.colors.primaryBlue,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  headingArrow: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  productInfo: {
    fontSize: 12,
    fontFamily: Constants.fonts.regular,
    color: 'rgba(0, 0, 0, 0.44)',
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  roundSeparator: {
    height: 5,
    width: 5,
    backgroundColor: Constants.colors.centralGray,
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 15
  },
  separator: {
    height: 1,
    backgroundColor: Constants.colors.centralGray,
    width: '70%',
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10
  }
});