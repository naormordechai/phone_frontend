import * as actionTypes from '../actions/actionTypes'

const initialState = {
    phones: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PHONES:
            return {
                ...state,
                phones: action.phones
            }
        case actionTypes.UPDATE_PHONE_REVIEWS:
            const newPhones = [...state.phones].map(phone => {
                if (phone._id === action.phone._id) phone = action.phone
                return phone
            });
            return {
                ...state,
                phones: newPhones
            }
    }
    return state
}

export default reducer