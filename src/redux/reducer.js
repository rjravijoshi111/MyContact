import { combineReducers } from 'redux';

const userLogin = (state = {}, action) =>{
    switch (action.type) {
        case "USER_LOGIN":
            return action.loginUser;
        default:
            return state;
    }
}

const userList = (state = [], action) =>{
    switch (action.type) {
        case "USER_LIST":
            return action.loginList;
        default:
            return state;
    }
}

const contactList = (state = [], action) =>{
    switch (action.type) {
        case "GET_CONTACT_LIST":
            return action.contactList;
        default:
            return state;
    }
}

export default combineReducers({
    userLogin : userLogin,
    contactList : contactList,
    userList : userList
})
