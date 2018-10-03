import React from 'react'
import IdService from '../../services/IdService'
import { connect } from 'react-redux'
import PhoneService from '../../services/PhoneService'
import * as actionCreators from '../../store/actions/index'
import './phone-details.css'

class PhoneDetails extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
    }

    state = {
        phone: PhoneService.getEmptyPhone()
    }

    componentDidMount() {
        PhoneService.getPhoneById(this.props.match.params.id)
            .then(({ data }) => this.setState({
                phone: data
            }));
    }

    handlerBuyProduct = () => {
        if (!!!this.props.user.email) {
            this.props.history.push('/login')
        } else {
            const url = this.props.match.url;
            this.props.history.push(`${url}/cart`)
        }
    }

    handlerPostReview = () => {
        if (!!!this.props.user.email) return this.props.history.push('/login')
        const { phone } = { ...this.state };
        phone.reviews.unshift({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            description: this.myRef.current.value,
            _id: IdService.makeId(),
            createdAt: Date.now()
        })
        this.props.onUpdatedReviewsPhone(phone)
        this.myRef.current.value = ''
    }

    render() {
        return (
            <section>
                <div className="section-details flex align-items-c">
                    <div className="flex column align-items-c">
                        <img className="img-details" src={this.state.phone.imgURL} />
                        <button onClick={this.handlerBuyProduct} className="btn btn-cart">ADD TO CART</button>
                    </div>
                    <div>
                        <h2>{this.state.phone.name}</h2>
                        <h3>${this.state.phone.price}</h3>
                        <p>release date: <span className="bold">{this.state.phone.releaseDate}</span></p>
                        <p>weight: <span className="bold">{this.state.phone.weight}</span></p>
                        <p>os: <span className="bold">{this.state.phone.os}</span></p>
                        <p>screen size: <span className="bold">{this.state.phone.screenSize}</span></p>
                        <p>storage: <span className="bold">{this.state.phone.storage}</span></p>
                        <p>battery: <span className="bold">{this.state.phone.battery}</span></p>
                        <p>rear camera: <span className="bold">{this.state.phone.rearCamera}</span></p>
                        <p>front camera: <span className="bold">{this.state.phone.frontCamera}</span></p>
                        <p>{this.state.phone.description}</p>
                    </div>
                </div>
                <div>
                    <h3>What People Thought About This Phone</h3>
                    <h4>Write here the your comment</h4>
                    <div><textarea ref={this.myRef} rows="4" cols="50" placeholder="write here..."></textarea></div>
                    <button onClick={this.handlerPostReview}>post</button>
                </div>
                {this.state.phone.reviews.map(review => (
                    <div key={review._id} className="box flex space-between">
                        <div>{review.createdAt} - {review.firstName} {review.lastName}</div>
                        <div>{review.description}</div>
                    </div>
                ))}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        phones: state.phoneReducer.phones
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onUpdatedReviewsPhone: (phone) => dispatch(actionCreators.updatePhoneReviews(phone))
    }
}


export default connect(mapStateToProps, mapStateToDispatch)(PhoneDetails)