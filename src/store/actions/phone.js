import * as actionTypes from './actionTypes'
import PhoneService from '../../services/PhoneService'


// load all phones from a database

const _laodPhones = (phones) => {
    return {
        type: actionTypes.LOAD_PHONES,
        phones
    }
}

export const loadPhones = () => {
    return dispatch => {
        PhoneService.query()
            .then(({ data }) => {
                dispatch(_laodPhones(data))
            })
    }
}


// in case of reviews phone update

const _updatePhoneReviews = (phone) => {
    return {
        type: actionTypes.UPDATE_PHONE_REVIEWS,
        phone
    }
}

export const updatePhoneReviews = (phone) => {
    return dispatch => {
        PhoneService.updatePhoneReviews(phone)
            .then(({ data }) => {
                dispatch(_updatePhoneReviews(data))
            })
    }
}
