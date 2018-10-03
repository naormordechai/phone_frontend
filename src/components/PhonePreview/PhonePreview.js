import React from 'react'
import { Link } from 'react-router-dom'
import './phone-preview.css'

class PhonePreview extends React.Component {
    render() {
        return (
            <div className="section-preview flex bt align-items-c">
                <div className="mr">
                    <h2>{this.props.phone.name}</h2>
                    <p>release date : <span className="bold">{this.props.phone.releaseDate}</span></p>
                    <h2 className="bt bb price">${this.props.phone.price}</h2>
                    <p>{this.props.phone.description}</p>
                    <Link className="link btn btn-buy" to={`/phone/${this.props.phone._id}`}>BUY NOW</Link>
                </div>
                <div>
                    <img className="img" src={this.props.phone.imgURL} />
                </div>
            </div>
        )
    }
}


export default PhonePreview