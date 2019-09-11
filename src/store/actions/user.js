import * as actionTypes from './actionTypes'
import UserService from '../../services/UserService'


// in case the user connects

const _setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

export const setUser = (user) => {
    return dispatch => {
        UserService.checkLogin(user)
            .then(({ data }) => {
                localStorage.setItem('user-market-phones', JSON.stringify(data))
                dispatch(_setUser(data))
            })
    }
}


// in the event of a user disconnecting from the system

export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGOUT_USER,
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                _id: '',
                cartItems: []
            }
        })
    }
}


// in case of cart items update

const _updateCartItems = (user) => {
    return {
        type: actionTypes.UPDATE_CART_ITEMS,
        user
    }
}


export const updateCartItems = (user) => {
    return dispatch => {
        UserService.updetedCartUser(user)
            .then(({ data }) => {
                dispatch(_updateCartItems(data))
            })
    }
}


// in case of adding a user

const _addUser = (user) => {
    return {
        type: actionTypes.ADD_USER,
        user
    }
}

export const addUser = (user) => {
    return dispatch => {
        UserService.addUser(user)
            .then(({ data }) => {
                localStorage.setItem('user-market-phones', JSON.stringify(data))
                dispatch(_addUser(data))
            })
    }
}