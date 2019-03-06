//---------------------------------------------------
  // Libraries & Class
//---------------------------------------------------

import React from 'react';
import { Alert } from 'react-native';

APPCONSTANTS = require('../globals/appContsants');

//---------------------------------------------------
  // Class: Validation
//---------------------------------------------------

class Validation{

  textInputCheck(txtInput,emptyMessage,notValidMessage){
    var regex = /^[a-zA-Z ]+$/;
    console.log("TXTInput-->"+txtInput);

    if (txtInput !== null && (txtInput.length > 0)){

      if(regex.test(txtInput)){
          return true
      }else{
        Alert.alert( APPCONSTANTS.APP_NAME,notValidMessage)
      }

    }else{
      Alert.alert( APPCONSTANTS.APP_NAME,emptyMessage)
      return false
    }
  }

  dateCheck(date1,date2,message){
    if(date1 > date2){
      Alert.alert( APPCONSTANTS.APP_NAME,message)
      return false
    }
    return true
  }

  //Check empty TextInput
  emptyTextInput(txtInput,message){
    if (txtInput == null || txtInput.length <= 0){
      Alert.alert( APPCONSTANTS.APP_NAME, message )
      return false
    }
    return true
  }

  //Email Validation
  isValidEmail(email,message){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!(regex.test(email))){
      Alert.alert( APPCONSTANTS.APP_NAME,message )
      return false
    }
    return true
  }

  isValidMobileNumber(number,message){
    
    var regex = /^[\s()+-]*([0-9][\s()+-]*){5,15}$/;
    
    if(!(regex.test(number))){
      Alert.alert(APPCONSTANTS.APP_NAME,message)
      return false
    }
    return true
  }

  //Check Password length greater than minimum
  passwordLength(password,min,message){

      if(password.length < min){
        Alert.alert(APPCONSTANTS.APP_NAME, message +" " + min + " characters")
          return false
      }
      return true
  }


  passwordLength2(password,min,message){
    if(password.length < min){
      Alert.alert(APPCONSTANTS.APP_NAME, message)
      return false
    }
    return true
  }

  //Check if password is same
  samePassword(currentpwd,nwpwd,message){
      if(currentpwd == nwpwd){
        Alert.alert(APPCONSTANTS.APP_NAME, message)
        return false
      }
      return true
  }

  
  
}

module.exports = new Validation()
