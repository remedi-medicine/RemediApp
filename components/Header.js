import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ToastAndroid, TextInput } from "react-native";
import Constants from "../Constants/Constants";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchText: '',
    };
  }



  render() {
    return(
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.onBack}>
            <Image source={Constants.img.backArrow} style={styles.icons}/>
          </TouchableOpacity>
          {this.state.isSearch ? 
          <TextInput style={styles.searchText} 
          numberOfLines={1} placeholder="Search For Drugs & Medicines" 
          placeholderTextColor={Constants.colors.centralGray}
          onChangeText={(text) => this.setState({searchText: text})} 
          onSubmitEditing={() => this.props.isSearch ? this.props.navigation.replace('Search', {searchText: this.state.searchText}) :this.props.navigation.navigate('Search', {searchText: this.state.searchText})}
          autoFocus={true}/>
          :<Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>}
          {this.props.showSearch == false ? <View style={{width: 16, height: 16}}/> : 
          (this.state.isSearch ? (<TouchableOpacity onPress={() => this.setState({isSearch: false})}>
            <Image source={Constants.img.close} style={styles.icons}/>
          </TouchableOpacity>) : (<TouchableOpacity onPress={() => this.setState({isSearch: true})}>
            <Image source={Constants.img.search} style={styles.icons}/>
          </TouchableOpacity>))}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: Constants.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    color: Constants.colors.primaryGreen,
    fontFamily: Constants.fonts.bold,
    textAlign: 'center',
    width: '70%',
  },
  searchText: {
    fontSize: 14,
    color: Constants.colors.primaryGreen,
    fontFamily: Constants.fonts.regular,
    textAlign: 'left',
    width: '70%',
  },
  icons: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
});