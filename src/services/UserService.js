import axios from 'axios'
const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:8080/user';

async function checkLogin(userInfo) {
    return await axios.post(`${USER_URL}`, userInfo)
}

async function getUserById(userId) {
    return await axios.get(`${USER_URL}/${userId}`)
}

async function updetedCartUser(user) {
    return await axios.put(`${USER_URL}/${user._id}`, user)
}

function getUserEmpty() {
    return {
        _id : '',
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        cartItems : []
    }
}

export default {
    checkLogin,
    getUserById,
    updetedCartUser,
    getUserEmpty
}