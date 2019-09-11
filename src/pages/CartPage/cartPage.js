import React from 'react'
import PhoneService from '../../services/PhoneService'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import './cart-page.css'

class CartPage extends React.Component {

    state = {
        phone: PhoneService.getEmptyPhone(),
    }

    handleStatusCart = (action, idx) => {
        const user = JSON.parse(localStorage.getItem('user-market-phones'));
        // const { phone } = { ...this.state }
        const { phone } = this.state;
        if (action === 'add') user.cartItems.push(phone)
        else user.cartItems.splice(idx, 1)
        localStorage.setItem('user-market-phones', JSON.stringify(user))
        this.props.onUpdatedCartItems(user)
    }

    loadPhone = () => {
        const { id } = this.props.match.params;
        PhoneService.getPhoneById(id)
            .then(({ data }) => {
                this.setState({
                    ...this.state,
                    phone: data
                })
            })
    }

    componentDidMount() {
        this.loadPhone()
    }

    render() {
        const { user } = this.props;
        const { phone } = this.state
        const payment = user.cartItems.map(item => item.price).reduce((acc, val) => acc + val, 0)
        return (
            <section>
                <div className="flex">
                    <img className="img-in-cart" src={phone.imgURL} />
                    <div className="flex column space-between">
                        <h4>{phone.name}</h4>
                        <div className="flex container-price">
                            <h3>${phone.price}</h3>
                            <button onClick={() => this.handleStatusCart('add')} className="btn-cart btn-add-cart">ADD</button>
                        </div>
                    </div>
                </div>
                <h3>My cart: </h3>
                <h4>payment ${payment}</h4>
                <div>
                    {user.cartItems.map((item, idx) => (
                        <div className="flex space-between box-cart" key={item._id + idx}>
                            <p>{item.name}</p>
                            <button onClick={() => this.handleStatusCart('remove', idx)}>X</button>
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