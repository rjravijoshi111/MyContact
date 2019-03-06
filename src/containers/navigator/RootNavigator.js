import { createStackNavigator } from 'react-navigation'
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import AddContact from "../screens/AddContact";
import ContactDetail from "../screens/ContactDetail";

export const LoginRoot = createStackNavigator({
    Login : {
        screen : Login
    },
    Signup : {
        screen : Signup
    },
    Home : {
        screen : Home
    },
    AddContact : {
        screen : AddContact
    },
    ContactDetail : {
        screen : ContactDetail
    }
},{
    initialRouteName : "Login"
})
export const HomeRoot = createStackNavigator({
    Home : {
        screen : Home
    },
    AddContact : {
        screen : AddContact
    },
    Login : {
        screen : Login
    },
    Signup : {
        screen : Signup
    },
    ContactDetail : {
        screen : ContactDetail
    }
},{
    initialRouteName : 'Home'
})