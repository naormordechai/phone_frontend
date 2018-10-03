import React from 'react'
import PhonePreview from '../PhonePreview/PhonePreview'
import './phone-list.css'

const phonesList = (props) => (
    <section>
        <ul>
            {props.phones.map(phone => (
                <li key={phone._id}><PhonePreview phone={phone} /></li>
            ))}
        </ul>
    </section>
)

export default phonesList