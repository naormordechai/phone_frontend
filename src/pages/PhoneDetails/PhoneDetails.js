import React from 'react'
import { connect } from 'react-redux'
import PhoneService from '../../services/PhoneService'
import PhoneReviews from '../../components/PhoneReviews/PhoneReviews'
import './phone-details.css'

class PhoneDetails extends React.Component {

    state = {
        phone: PhoneService.getEmptyPhone(),
    }

    componentDidMount() {
        this.loadPhone()
    }

    loadPhone = () => {
        const { id } = this.props.match.params;
        PhoneService.getPhoneById(id)
            .then(({ data }) => this.setState({
                ...this.state,
                phone: data
            }));
    }

    handlerBuyProduct = () => {
        if (!this.props.user.email) this.props.history.push('/login')
        else {
            const { url } = this.props.match;
            this.props.history.push(`${url}/cart`)
        }
    }

    goToLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        const { id } = this.props.match.params;
        const { phone } = this.state
        return (
            <section>
                <div className="section-details flex align-items-c">
                    <div className="flex column align-items-c">
                        <img className="img-details" src={phone.imgURL} />
                        <button onClick={this.handlerBuyProduct} className="btn btn-cart">ADD TO CART</button>
                    </div>
                    <div>
                        <h2>{phone.name}</h2>
                        <h3>${phone.price}</h3>
                        <p>release date: <span className="bold">{phone.releaseDate}</span></p>
                        <p>weight: <span className="bold">{phone.weight}</span></p>
                        <p>os: <span className="bold">{phone.os}</span></p>
                        <p>screen size: <span className="bold">{phone.screenSize}</span></p>
                        <p>storage: <span className="bold">{phone.storage}</span></p>
                        <p>battery: <span className="bold">{phone.battery}</span></p>
                        <p>rear camera: <span className="bold">{phone.rearCamera}</span></p>
                        <p>front camera: <span className="bold">{phone.frontCamera}</span></p>
                        <p>{phone.description}</p>
                    </div>
                </div>
                <PhoneReviews id={id} click={this.goToLogin} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps)(PhoneDetails)
