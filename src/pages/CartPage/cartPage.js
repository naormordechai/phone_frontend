import React from 'react'
import PhoneService from '../../services/PhoneService'
import UserService from '../../services/UserService'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/indexUser'
import './cart-page.css'

class CartPage extends React.Component {

    state = {
        phone: PhoneService.getEmptyPhone(),
    }

    handlerAddToCart = (action, idx) => {
        const user = JSON.parse(localStorage.getItem('user-market-phones'));
        if (action === 'add') {
            user.cartItems.push(this.state.phone)
        } else {
            user.cartItems.splice(idx, 1)
        }
        localStorage.setItem('user-market-phones', JSON.stringify(user))
        this.props.onUpdatedCartItems(user)
    }

    componentDidMount() {
        PhoneService.getPhoneById(this.props.match.params.id)
            .then(({ data }) => {
                this.setState({
                    ...this.state,
                    phone: data
                })
            })
    }

    render() {
        const payment = this.props.user.cartItems.map(item => item.price).reduce((acc, val) => acc + val, 0)
        return (
            <section>
                <div className="flex">
                    <img className="img-in-cart" src={this.state.phone.imgURL} />
                    <div className="flex column space-between">
                        <h4>{this.state.phone.name}</h4>
                        <div className="flex container-price">
                            <h3>${this.state.phone.price}</h3>
                            <button onClick={() => this.handlerAddToCart('add')} className="btn-cart btn-add-cart">ADD</button>
                        </div>
                    </div>
                </div>
                <h3>My cart: </h3>
                <h4>payment ${payment}</h4>
                <div>
                    {this.props.user.cartItems.map((item, idx) => (
                        <div className="flex space-between box-cart" key={item._id + idx}>
                            <p>{item.name}</p>
                            <button onClick={() => this.handlerAddToCart('remove', idx)}>X</button>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onUpdatedCartItems: (user) => dispatch(actionCreators.updateCartItems(user))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(CartPage)