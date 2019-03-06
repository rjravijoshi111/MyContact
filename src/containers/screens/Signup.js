import React, {Component} from 'react';
import { View, Alert, Keyboard, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Form, Item, Input, Label} from 'native-base';
import { getUserList } from '../../redux/action';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../components/_Button";
import globalStyles from '../../globals/globalStyle';
import Validation from "../../utils/ValidationManager";
import APPCONSTANTS from "../../globals/appContsants";
import * as colors from '../../globals/colors';
const {height , width} = Dimensions.get("window");
class Signup extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : "Registration",
            headerTintColor : colors.headerTintColor,
            headerStyle : globalStyles.headerStyle
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        this.state = {
            userList : props.userList || [],
            userName : '',
            email : '',
            phoneNumber : '',
            password : '',
            confirmPassword : ''
        }
    }

    //=======================================================================
    // signUpTap Method
    //=======================================================================

    signUpTap = () =>{

        Keyboard.dismiss()
        
        // if (Validation.emptyTextInput(this.state.userName, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_USERNAME)) {
        //     if (Validation.isValidEmail(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KINVALID_EMAIL)) {
        //         if (Validation.emptyTextInput(this.state.phoneNumber, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PHONENUMBER)) {
        //             if (Validation.isValidMobileNumber(this.state.phoneNumber, APPCONSTANTS.ALERT_MESSAGES.KINVALID_PHONENUMBER)) {
        //                 if (Validation.emptyTextInput(this.state.password, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PASSWORD)) {
        //                     if (Validation.passwordLength(this.state.password, 8, APPCONSTANTS.ALERT_MESSAGES.KINVALID_PASSWORD)) {
        //                         if (Validation.matchPasswordPIN(this.state.password, this.state.confirmPassword, APPCONSTANTS.ALERT_MESSAGES.KPASSWORD_DOESNOTMATCH)) {

                                    const user = { userID: new Date().getTime(), userName: this.state.userName, email: this.state.email, phoneNumber: this.state.phoneNumber, password: this.state.password, confirmPassword: this.state.confirmPassword }

                                    var userData = this.state.userList
                                    if (userData != null && userData != undefined) {
                                        index = userData.findIndex(x => x.email == this.state.email);

                                        if (index >= 0) {
                                            Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ALERT_MESSAGES.USER_EXIST)
                                            return;
                                        } else {
                                            userData.push(user)
                                        }
                                    } else {
                                        userData.push(user)
                                    }
                                    let data = JSON.stringify(userData)
                                    this.props.getUserList(JSON.parse(data))
                                    Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ALERT_MESSAGES.REGISTRATION_MESSAGE,
                                        [
                                            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
                                        ]
                                    )
                                // }
                            // }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    //=======================================================================
    // _focusInput Method
    //=======================================================================

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    //=======================================================================
    // render Method
    //=======================================================================

    render(){
        return(
            <Container>
                <Content>
                    <View style={styles.card}>
                        <Form style={styles.formStyle}>

                             <View style={{flex:1,borderBottomWidth:0.5,borderColor:'lightgray'}}>
                                <Item floatingLabel last style={{margin:0,padding:0}}>
                                <Label>{APPCONSTANTS.TEXTFIELD_LABEL.USERNAME}</Label>
                                <Input 
                                    style={styles.textInputStyle}
                                    getRef={(input) => this.usernameInput = input}
                                    value={this.state.userName}
                                    blurOnSubmit={true}
                                    onChangeText={ (text) => this.setState({ userName : text }) }
                                    textColor = {colors.textFieldColor}
                                    inputContainerStyle={{paddingLeft:10,paddingRight:10}}
                                    labelTextStyle={{paddingLeft:10,paddingRight:10}}
                                    returnKeyType={"next"}
                                    keyboardType = {"email-address"}
                                    autoCapitalize = 'none'
                                    onSubmitEditing={() => this._focusInput('emailInput')}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <Entypo name={"user"} size={30} color={"#243747"} />
                                </View> 
                            </View>
                        
                            <View style={{flex:1,borderBottomWidth:0.5,borderColor:'lightgray'}}>
                                <Item floatingLabel last style={{margin:0,padding:0}}>
                                <Label>{APPCONSTANTS.TEXTFIELD_LABEL.EMAIL_ID}</Label>
                                <Input 
                                    style={styles.textInputStyle}
                                    getRef={(input) => this.emailInput = input}
                                    value={this.state.email}
                                    blurOnSubmit={true}
                                    onChangeText={ (text) => this.setState({ email : text }) }
                                    textColor = {colors.textFieldColor}
                                    inputContainerStyle={{paddingLeft:10,paddingRight:10}}
                                    labelTextStyle={{paddingLeft:10,paddingRight:10}}
                                    returnKeyType={"next"}
                                    keyboardType = {"email-address"}
                                    autoCapitalize = 'none'
                                    onSubmitEditing={() => this._focusInput('phoneNumberInput')}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <MaterialIcons name={"mail"} size={30} color={"#243747"} />
                                </View> 
                            </View>

                            <View style={{flex:1,borderBottomWidth:0.5,borderColor:'lightgray'}}>
                                <Item floatingLabel last style={{margin:0,padding:0}}>
                                <Label>{APPCONSTANTS.TEXTFIELD_LABEL.PHONENUMBER}</Label>
                                <Input 
                                    style={styles.textInputStyle}
                                    getRef={(input) => this.phoneNumberInput = input}
                                    value={this.state.phoneNumber}
                                    blurOnSubmit={true}
                                    onChangeText={ (text) => this.setState({ phoneNumber : text }) }
                                    textColor = {colors.textFieldColor}
                                    inputContainerStyle={{paddingLeft:10,paddingRight:10}}
                                    labelTextStyle={{paddingLeft:10,paddingRight:10}}
                                    returnKeyType={"next"}
                                    keyboardType = {"name-phone-pad"}
                                    autoCapitalize = 'none'
                                    onSubmitEditing={() => this._focusInput('passwordInput')}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <Entypo name={"mobile"} size={30} color={"#243747"} />
                                </View> 
                            </View>
                            
                            <View style={{flex:1,borderBottomWidth:0.5,borderColor:"lightgray"}}>
                                <Item floatingLabel last>
                                <Label>{APPCONSTANTS.TEXTFIELD_LABEL.PASSWORD}</Label>
                                <Input
                                    style={styles.textInputStyle}
                                    getRef={(input) => this.passwordInput = input}
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    onChangeText={ (text) => this.setState({ password : text }) }
                                    textColor = {colors.textFieldColor}
                                    inputContainerStyle={{paddingLeft:10,paddingRight:10}}
                                    labelTextStyle={{paddingLeft:10,paddingRight:10}}
                                    returnKeyType={"done"}
                                    onSubmitEditing={() => this._focusInput('confirmPasswordInput')}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <Entypo name={"lock"} size={30} color={"#243747"} />
                                </View> 
                            </View>

                            <View style={{flex:1,borderBottomWidth:0.5,borderColor:"lightgray"}}>
                                <Item floatingLabel last>
                                <Label>{APPCONSTANTS.TEXTFIELD_LABEL.CONFIRM_PASSWORD}</Label>
                                <Input
                                    style={styles.textInputStyle}
                                    getRef={(input) => this.confirmPasswordInput = input}
                                    value={this.state.confirmPassword}
                                    secureTextEntry={true}
                                    onChangeText={ (text) => this.setState({ confirmPassword : text }) }
                                    textColor = {colors.textFieldColor}
                                    inputContainerStyle={{paddingLeft:10,paddingRight:10}}
                                    labelTextStyle={{paddingLeft:10,paddingRight:10}}
                                    returnKeyType={"done"}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <Entypo name={"lock"} size={30} color={"#243747"} />
                                </View> 
                            </View>
                        </Form>
                    </View>
                    <View style={{ marginHorizontal: 20,marginTop:20}}>
                        <Button buttonText="Sign up" color="#fff" bgColor="#243747" width="100%" onPress={() => this.signUpTap()} />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userList : state.userList
})

const mapDispatchToProps = dispatch =>({
    getUserList: (userList) => dispatch(getUserList(userList)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Signup)

//=======================================================================
// Styles
//=======================================================================

const styles = StyleSheet.create({
    card:{
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#fff',
        shadowOffset:{  width: 3,  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        marginTop : 50
    },
    formStyle:{
        width:'100%',
        flex: 1,
        marginBottom:40
    },
    textInputStyle:{
        height:45,
        marginTop:5,
        marginBottom:15,
        width: width - 130,
        borderColor: "gray",
        paddingLeft:5,
        paddingRight:20,
        marginRight:35,
    },
    loginButtonView:{
        marginTop: -20,
        alignSelf: 'center',
        backgroundColor : 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        height : 40,
        width : 40,
        borderRadius: 20,
    },
});