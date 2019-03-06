export const userLogin = loginUser =>({
    type : "USER_LOGIN",
    loginUser : loginUser
})

export const getUserList = loginList =>({
    type : "USER_LIST",
    loginList : loginList
})

export const getContactList = contactList =>({
    type : "GET_CONTACT_LIST",
    contactList : contactList
})
