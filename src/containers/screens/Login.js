import React, {Component} from 'react';
import { View, Keyboard, StyleSheet, Dimensions,Alert } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions , StackActions} from "react-navigation";
import { Container, Header, Content, Card, CardItem, Body, Text, Form, Item, Input, Label, Icon} from 'native-base';
import { userLogin } from '../../redux/action';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import globalStyles from '../../globals/globalStyle';
import Button from "../../components/_Button";
import * as colors from '../../globals/colors';
import Validation from "../../utils/ValidationManager";
import APPCONSTANTS from "../../globals/appContsants";
const {height , width} = Dimensions.get("window");

class Login extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : "Login",
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
            userName : props.userLogin.userName || '',
            password : props.userLogin.password || '',
            userList : props.userList || []
        }
        console.log("Props",JSON.stringify(props))
    }

    //=======================================================================
    // componentWillReceiveProps Method
    //=======================================================================

    componentWillReceiveProps(newProps){
        this.setState({
            userList : newProps.userList
        })
    }

    //=======================================================================
    // SignIn Tap Method
    //=======================================================================

    signInTap = () =>{
        Keyboard.dismiss()
        if (Validation.isValidEmail(this.state.userName, APPCONSTANTS.ALERT_MESSAGES.KINVALID_EMAIL)) {
            if (Validation.emptyTextInput(this.state.password, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PASSWORD)) {
                
                var userData = this.state.userList
        
                let index = userData.findIndex(x => x.email == this.state.userName && x.password == this.state.password);

                if (index >= 0) {
                    const user = { userName: userData[index].userName, password: userData[index].password, userID: userData[index].userID }
                    this.props.onLogin(user)
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Home' })],
                    });
                    this.props.navigation.dispatch(resetAction)
                } else {
                    Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ALERT_MESSAGES.LOGIN_FAIL_MESSAGE)
                }
            }
        }
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
                <Content style={{flex:1}} bounces={false}>
                    <LinearGradient colors={['#E6E7E8','#FFF']} style={{flex:1}}>
                        <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
                            <MaterialIcons name={"import-contacts"} color={"#243747"} size={125} />
                            <Text style={styles.titleStyle}>{"MY CONTACT BOOK"}</Text>
                        </View>
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
                                        onSubmitEditing={() => this._focusInput('passwordInput')}
                                    />
                                    </Item>
                                    <View style={globalStyles.textFieldIcon}>
                                        <Entypo name={"user"} size={30} color={"#243747"} />
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
                                    />
                                    </Item>
                                    <View style={globalStyles.textFieldIcon}>
                                        <Entypo name={"lock"} size={30} color={"#243747"}/>
                                    </View> 
                                </View>
                                </Form>
                            </View>
                            <View style={{ marginHorizontal: 20,marginTop:20}}>
                                <Button buttonText="Login" color="#fff" bgColor="#243747" width="100%" onPress={this.signInTap} />
                            </View>
                            <View style={{ marginVertical: 5,marginHorizontal: 20, marginBottom: 20 }}>
                                <Button buttonText="Create Account" color="#fff" bgColor={"#00BBB1"} onPress={()=>this.props.navigation.navigate("Signup")} width="100%" />
                            </View>
                    </LinearGradient>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    userLogin : state.userLogin,
    userList : state.userList,
})

const mapDispatchToProps = dispatch =>({
    onLogin: (user) => dispatch(userLogin(user)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)

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
        marginTop : 50,
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
    titleStyle:{
        fontSize:20,fontWeight:'900',color:'#00BBB1'
    }
});