import React from 'react'
import { Link } from 'react-router-dom'
import './phone-preview.css'

const phonePreview = ({phone}) => (
    <div className="section-preview flex bt align-items-c">
        <div className="mr">
            <h2>{phone.name}</h2>
            <p>release date : <span className="bold">{phone.releaseDate}</span></p>
            <h2 className="bt bb price">${phone.price}</h2>
            <p>{phone.description}</p>
            <Link className="link btn btn-buy" to={`/phone/${phone._id}`}>BUY NOW</Link>
        </div>
        <div>
            <img className="img" src={phone.imgURL} />
        </div>
    </div>
)


export default phonePreview