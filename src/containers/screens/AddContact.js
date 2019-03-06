import React, {Component} from 'react';
import { View, TouchableOpacity, Keyboard, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Form, Item, Input, Label} from 'native-base';
import { getContactList } from '../../redux/action';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs'
import globalStyles from '../../globals/globalStyle';
import * as colors from '../../globals/colors';
import Button from "../../components/_Button";
import Validation from "../../utils/ValidationManager";
import APPCONSTANTS from "../../globals/appContsants";
const {height , width} = Dimensions.get("window");

class AddContact extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : (state.params && state.params.contactData && (state.params.contactData != undefined || state.params.contactData != null)) ? "Edit Contact" : "Add Contact",
            headerTintColor : colors.headerTintColor,
            headerStyle : globalStyles.headerStyle
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        const {params} = props.navigation.state
        this.state = {
            userID : props.userLogin.userID,
            isEdit : (params && params.contactData != undefined) ? true : false,
            userName :  params && params.contactData && params.contactData.userName || '',
            email : params && params.contactData && params.contactData.email || '',
            phoneNumber : params && params.contactData && params.contactData.phoneNumber || '',
            imageName : params && params.contactData && params.contactData.image || '',
            contactList : props.contactList || [],
            avatarSource : require("../../assets/image/user.jpg")
        }
        this.uploadImage = this.uploadImage.bind(this)
    }

    //=======================================================================
    // componentDidMount Method
    //=======================================================================
    
    async componentDidMount(){
        
        if(this.state.imageName != ''){
            let dirPath = RNFS.DocumentDirectoryPath + "/userImage/"+this.state.imageName
            var isExist = await RNFS.exists(dirPath)
            this.setState({
                avatarSource : (isExist) ? { uri : "file://"+dirPath} : require("../../assets/image/user.jpg")
            })
        }
    }

    //=======================================================================
    // addContact Method
    //=======================================================================

    addContact = async () =>{

        if (Validation.emptyTextInput(this.state.userName, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_USERNAME)) {
            if (Validation.isValidEmail(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KINVALID_EMAIL)) {
                if (Validation.emptyTextInput(this.state.phoneNumber, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PHONENUMBER)) {
                    if (Validation.isValidMobileNumber(this.state.phoneNumber, APPCONSTANTS.ALERT_MESSAGES.KINVALID_PHONENUMBER)) {

                        var filename = ''
                    
                        if(this.state.avatarSource.uri != null && this.state.avatarSource.uri != null){
                            filename = this.state.avatarSource && new Date().getTime()+"."+this.state.avatarSource.uri.split('.').pop();
                            await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/userImage")
                            let dirPath = RNFS.DocumentDirectoryPath + "/userImage/"+filename
                            var isExist = await RNFS.exists(this.state.avatarSource.uri.split(":")[1])
                            isExist && await RNFS.copyFile(this.state.avatarSource.uri.split(":")[1], dirPath)
                        }
                        
                        const user = { id : new Date().getTime(), userName : this.state.userName, email : this.state.email, phoneNumber : this.state.phoneNumber,userID : this.state.userID, image : filename || ''}
                        var userData = this.state.contactList
                        if(userData != null && userData != undefined){
                            index = userData.findIndex(x => x.email== this.state.email);
                            
                            if(this.state.isEdit){
                                userData[index].userName = this.state.userName
                                userData[index].email = this.state.email
                                userData[index].phoneNumber = this.state.phoneNumber
                                userData[index].image = filename
                            }else{
                                if(index >= 0){
                                    Alert.alert("My Contact Book","Contact already exist!!")
                                    return
                                }else{
                                    userData.push(user)
                                }
                            }
                        }else{
                            userData.push(user)
                        }
                        let data = JSON.stringify(userData)
                        this.props.getContactList(JSON.parse(data))
                        let msg = (this.state.isEdit) ? APPCONSTANTS.ALERT_MESSAGES.EDITCONTACT_MESSAGE : APPCONSTANTS.ALERT_MESSAGES.ADDCONTACT_MESSAGE
                        Alert.alert(APPCONSTANTS.APP_NAME,msg,
                            [
                                {text: 'Ok', onPress: () => this.props.navigation.goBack()},
                            ]
                        )
                    }
                }
            }
        }
    }

    //=======================================================================
    // uploadImage Method
    //=======================================================================

    uploadImage = () =>{
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            // storageOptions: {
            //   skipBackup: true
            // }
        };
      
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    avatarSource: source
                });
            }
        });
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
                <Content bounces={false}>
                    <View style={styles.card}>
                        <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                            <TouchableOpacity onPress={this.uploadImage}>
                                <Image source={this.state.avatarSource} style={{height:100,width:100,borderRadius:50,borderWidth:1,borderColor:'lightgray'}} defaultSource={require("../../assets/image/user.jpg")} /> 
                            </TouchableOpacity>
                        </View>
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
                                    returnKeyType={"done"}
                                    keyboardType = {"name-phone-pad"}
                                    autoCapitalize = 'none'
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />
                                </Item>
                                <View style={globalStyles.textFieldIcon}>
                                    <Entypo name={"mobile"} size={30} color={"#243747"} />
                                </View> 
                            </View>
                        </Form>
                    </View>
                    <View style={{ marginHorizontal: 20,marginTop:20}}>
                        <Button buttonText={(this.props.navigation.state.params && (this.props.navigation.state.params.contactData != undefined || this.props.navigation.state.params.contactData != null)) ? "Edit Contact" : "Add Contact"} color="#fff" bgColor="#243747" width="100%" onPress={() => this.addContact()} />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userLogin : state.userLogin,
    contactList : state.contactList
})

const mapDispatchToProps = dispatch =>({
    getContactList: (contactList) => dispatch(getContactList(contactList)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AddContact)

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