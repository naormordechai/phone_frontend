import axios from 'axios'
const PHONE_URL = (process.env.NODE_ENV !== 'development')
    ? '/phone'
    : '//localhost:8080/phone';


async function query() {
    return await axios.get(PHONE_URL)
}

async function getPhoneById(phoneId) {
    return await axios.get(`${PHONE_URL}/${phoneId}`)
}

async function updatePhoneReviews(phone) {
    return await axios.put(`${PHONE_URL}/${phone._id}`, phone)
}

function getEmptyPhone() {
    return {
        title: '',
        name: '',
        releaseDate: '',
        weight: null,
        os: '',
        screenSize: '',
        storage: '',
        battery: '',
        rearCamera: '',
        frontCamera: '',
        description: '',
        price: null,
        imgURL: '',
        reviews: []
    }
}

export default {
    query,
    getPhoneById,
    getEmptyPhone,
    updatePhoneReviews
}