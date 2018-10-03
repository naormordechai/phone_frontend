import * as actionTypes from './actionTypes'
import UserService from '../../services/UserService'

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