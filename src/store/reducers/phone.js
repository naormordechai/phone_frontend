import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initialState = {
    phones: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PHONES:
            return updateState(state, { phones: action.phones })
        case actionTypes.UPDATE_PHONE_REVIEWS:
            const newPhones = [...state.phones].map(phone => {
                if (phone._id === action.phone._id) phone = action.phone
                return phone
            });
            return updateState(state, { phones: newPhones })
    }
    return state
}

export default reducer