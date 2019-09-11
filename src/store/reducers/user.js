import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

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
    const { user } = action
    switch (action.type) {
        case actionTypes.SET_USER:
            return updateState(state, { user })
        case actionTypes.LOGOUT_USER:
            return updateState(state, { user })
        case actionTypes.UPDATE_CART_ITEMS:
            return updateState(state, { user })
        case actionTypes.ADD_USER:
            return updateState(state, { user })
    }
    return state
}

export default reducer