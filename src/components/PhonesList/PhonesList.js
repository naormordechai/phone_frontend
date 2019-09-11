import React from 'react'
import PhonePreview from '../PhonePreview/PhonePreview'
import classes from './phone-list.css'

const phonesList = ({phones}) => (
    <section>
        <h1 className={classes.red}>HELLO WORLD2!</h1>
        <ul className={classes.list}>
            {phones.map(phone => (
                <li key={phone._id}><PhonePreview phone={phone} /></li>
            ))}
        </ul>
    </section>
)

export default phonesList