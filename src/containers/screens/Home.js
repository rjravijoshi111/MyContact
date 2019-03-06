import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList,Image, Alert } from 'react-native';
import { connect } from 'react-redux'
import {NavigationActions , StackActions} from "react-navigation";
import { Container, Header, Content, Card, CardItem, Body, Text, Form, Item, Input, Label, Icon} from 'native-base';
import { getContactList, userLogin } from '../../redux/action';
import Entypo from "react-native-vector-icons/Entypo";
import globalStyles from '../../globals/globalStyle';
import * as colors from '../../globals/colors';
import RNFS from 'react-native-fs'
import ContactListComponents from "../../components/_ContactListComponents";
const {height , width} = Dimensions.get("window");
var _this = null
class Home extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : "Home",
            headerTintColor : colors.headerTintColor,
            headerStyle : globalStyles.headerStyle,
            headerRight : <View style={{flexDirection:'row'}}>
                            <Entypo name={"circle-with-plus"} size={30} style={{marginRight:10}} color={"#fff"} onPress={() => navigation.navigate("AddContact")}/>
                            <Entypo name={"log-out"} size={30} style={{marginRight:10}} color={"#fff"} onPress={() => _this.tapOnLogout()}/>
                        </View>,
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        _this =  this
        this.state = {
            userID : props.userLogin.userID,
            contactList : props.contactList.filter(e => e.userID == props.userLogin.userID )
        }
        
    }

    //=======================================================================
    // componentWillReceiveProps Method
    //=======================================================================

    componentWillReceiveProps(newProps){
        console.log("Home newProps-->",JSON.stringify(newProps))
        if(newProps.contactList != undefined){
            const result = newProps.contactList.filter(e => e.userID == this.state.userID );
            this.setState({
                contactList : result
            })
        }
        
    }

    //=======================================================================
    // renderItem Method
    //=======================================================================

    renderItem = (item) =>{
        return <ContactListComponents item={item} navigation={this.props.navigation} />
    }

    //=======================================================================
    // _listEmptyComponent Method
    //=======================================================================

    _listEmptyComponent = () =>{
        return(
            <View style={styles.emptyView}>
                <Text style={{fontSize:20}}>{"No record found"}</Text>
            </View>
        )
    }

    //=======================================================================
    // tapOnLogout Method
    //=======================================================================

    tapOnLogout(){
        Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ALERT_MESSAGES.LOGOUT,
            [
                {text: 'No', onPress: () => console.log("Cancle"), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    this.props.onLogout({})
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    this.props.navigation.dispatch(resetAction)
                }},
            ],
            { cancelable: false }
        )
    }

    //=======================================================================
    // render Method
    //=======================================================================

    render(){
        return(
            <Container>
                <Content>
                   <FlatList 
                        data={this.state.contactList}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        ListEmptyComponent={this._listEmptyComponent}
                        keyExtractor={(index) => index.toString()}
                   />
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
    onLogout: (user) => dispatch(userLogin(user)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)

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
    emptyView:{
        alignItems:'center',justifyContent:'center',marginTop:50
    }
    
});