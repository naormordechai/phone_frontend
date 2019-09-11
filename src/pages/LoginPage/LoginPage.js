import React from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

class LoginPage extends React.Component {

    state = {
        userInfo: {
            email: '',
            password: ''
        },
    }

    handlerLogin = (userInfo) => {
        this.props.onLoginUser(userInfo)
    }

    handlerEmail = (ev) => {
        this.setState({
            ...this.state,
            userInfo: {
                email: ev.target.value,
                password: this.state.userInfo.password,
            }
        })
    }

    handlerPassword = (ev) => {
        this.setState({
            ...this.state,
            userInfo: {
                email: this.state.userInfo.email,
                password: ev.target.value
            }
        })
    }

    componentWillReceiveProps(props) {
        (props.user.firstName ? props.history.goBack() : null)
    }

    render() {
        const { userInfo } = this.state
        return (
            <section>
                <input type="email" placeholder="email" onChange={this.handlerEmail} />
                <input type="password" placeholder="password" onChange={this.handlerPassword} />
                <button onClick={() => this.handlerLogin(userInfo)}>login</button>
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
        onLoginUser: (user) => dispatch(actionCreators.setUser(user))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(LoginPage)