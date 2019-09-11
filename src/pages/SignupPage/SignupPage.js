import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import './signup-page.css'

class SignupPage extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cartItems: [],
    }

    handleSignupForm = (ev) => {
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault()
        this.props.onAddUser(this.state)
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handlerSubmit} className="width">
                    <div>
                        <label className="ib" htmlFor="name">Name</label>
                        <input type="text" onChange={this.handleSignupForm} required name="firstName" id="name" placeholder="your name" />
                    </div>
                    <div>
                        <label className="ib" htmlFor="lastName">Last Name</label>
                        <input type="text" onChange={this.handleSignupForm} required id="lastName" name="lastName" placeholder="your last name" />
                    </div>
                    <div>
                        <label className="ib" htmlFor="email">Email</label>
                        <input id="email" onChange={this.handleSignupForm} required name="email" type="email" placeholder="your name" />
                    </div>
                    <div>
                        <label className="ib" htmlFor="password">Password</label>
                        <input id="password" onChange={this.handleSignupForm} required name="password" type="password" placeholder="your password" />
                    </div>
                    <input type="submit" />
                </form>
            </section>
        )
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onAddUser: (userDetails) => dispatch(actionCreators.addUser(userDetails))
    }
}

export default connect(null, mapStateToDispatch)(SignupPage)