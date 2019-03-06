import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text,Image, Alert } from 'react-native';
import RNFS from 'react-native-fs'
export default class ContactListComponents extends Component{

    constructor(props){
        super(props)
        this.state = {
            item : props.item
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.item != undefined && newProps.item != null){
            this.setState({item : newProps.item})
        }
    }

    render(){
        const data = this.state.item.item
        let image = (data.image != '') ? {uri : "file://"+ RNFS.DocumentDirectoryPath + "/userImage/"+data.image} : require("../assets/image/user.jpg")
        return(
            <TouchableOpacity  onPress={() => this.props.navigation.navigate("ContactDetail",{contactData : data})}>
                <View style={styles.listRow}>
                    <Image source={image} style={styles.imageStyle} defaultSource={require("../assets/image/user.jpg")} />
                    <View style={{marginHorizontal:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>{data.userName}</Text>
                        <Text style={{fontSize:15}}>{data.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listRow:{
        flexDirection:'row',alignItems:'center'
    },
    imageStyle :{
        height:50,width:50,borderRadius:25,margin:10,borderWidth:1,borderColor:'lightgray'
    }
})