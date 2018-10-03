import * as actionTypes from '../actions/actionTypes'

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        _id: '',
        cartItems: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            const updatedUser = action.user ? action.user : { ...state.user }
                return {
                    ...state,
                    user: updatedUser
                }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.UPDATE_CART_ITEMS:
            return {
                ...state,
                user: action.user
            }
    }
    return state
}

export default reducer