import React from "react";
import { Modal, View } from "react-native";
import Constants from "../Constants/Constants";
import globalStyles from "../Constants/globalStyles";
import * as Progress from "react-native-progress";

export default class LoadingModal extends React.Component {
  render() {
    return(
      <>
        <Modal
          visible={this.props.visible}
          transparent={true}
          animationType="fade">
          <View style={globalStyles.modalContainer}>
            <View style={globalStyles.modal}>
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
    )
  }
}