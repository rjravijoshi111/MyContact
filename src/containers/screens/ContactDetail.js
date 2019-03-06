import React, {Component} from 'react';
import { View, Alert, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content,Text} from 'native-base';
import { getContactList } from '../../redux/action';
import Feather from "react-native-vector-icons/Feather";
import RNFS from 'react-native-fs'
import globalStyles from '../../globals/globalStyle';
import * as colors from '../../globals/colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../components/_Button";
const {height , width} = Dimensions.get("window");

class ContactDetail extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : "Contact Detail",
            headerTintColor : colors.headerTintColor,
            headerRight : <Feather name={"edit"} size={30} color={"#fff"} style={{marginRight:10}} onPress={() => navigation.navigate("AddContact",{contactData : state.params.contactData})}/>,
            headerStyle : globalStyles.headerStyle
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        this.state = {
            userID : props.userLogin.userID,
            contactData : props.navigation.state.params.contactData,
            contactList : props.contactList,
            avatarSource : null
        }
        console.log("ContactDetail Props",JSON.stringify(props))
    }

    //=======================================================================
    // componentDidMount Method
    //=======================================================================

    async componentDidMount(){
        this.props.navigation.setParams({ contactData : this.state.contactData })
        let dirPath = RNFS.DocumentDirectoryPath + "/userImage/"+this.state.contactData.image
        var isExist = await RNFS.exists(dirPath)
        this.setState({
            avatarSource :(isExist && this.state.contactData.image != '') ? { uri : "file://"+dirPath} :require("../../assets/image/user.jpg")
        })
    }
    
    //=======================================================================
    // componentWillReceiveProps Method
    //=======================================================================

    async componentWillReceiveProps(newProps){
        console.log("Contact Detail New props-->", newProps)
        let dirPath = RNFS.DocumentDirectoryPath + "/userImage/"+this.state.contactData.image
        var isExist = await RNFS.exists(dirPath)
        this.setState({
            avatarSource :(isExist) ? { uri : "file://"+dirPath} :require("../../assets/image/user.jpg")
        })
    }

    //=======================================================================
    // tapOnDelete Method
    //=======================================================================

    tapOnDelete = () =>{
        Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ALERT_MESSAGES.DELETECONTACT_MESSAGE,
            [
                {text: 'No', onPress: () => console.log("Cancle"), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    let index = this.state.contactList.indexOf(this.state.contactData)
                    var data = this.state.contactList
                    data.splice(index,1)
                    let contactData = JSON.stringify(data)
                    this.props.getContactList(JSON.parse(contactData))
                    this.props.navigation.goBack()
                }},
            ],
            { cancelable: false }
        )
    }

    //=======================================================================
    // render Method
    //=======================================================================

    render(){
        const { contactData } = this.state;
        return(
            <Container>
                <Content bounces={false}>
                    <View style={styles.buttonView}>
                        <Image source={this.state.avatarSource} style={styles.imageStyle} />
                    </View>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',marginVertical:5}}>
                        <Text>{"Name"}</Text>
                        <Text>{":-"}</Text>
                        <Text>{contactData.userName || ""}</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',marginVertical:5}}>
                        <Text>{"Email"}</Text>
                        <Text>{":-"}</Text>
                        <Text>{contactData.email || ""}</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',marginVertical:5}}>
                        <Text>{"PhoneNumber"}</Text>
                        <Text>{":-"}</Text>
                        <Text>{contactData.phoneNumber || ""}</Text>
                    </View>
                </Content>
                <View style={styles.buttonView}>
                    <MaterialIcons name={"delete"} color={'red'} size={40} onPress={this.tapOnDelete} />
                </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(ContactDetail)

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
    imageStyle :{
        height:100,width:100,borderRadius:50,borderWidth:1,borderColor :'lightgray'
    },
    buttonView:{
        alignItems:'center',justifyContent:'center',marginVertical:20
    }

});