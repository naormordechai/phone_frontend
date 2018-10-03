import React from 'react';
import { connect } from 'react-redux'
import UserService from '../../services/UserService'
import * as actionCreators from '../../store/actions/indexUser'

class LoginPage extends React.Component {

    state = {
        userInfo: {
            email: '',
            password: ''
        },
        user: UserService.getUserEmpty(),
    }

    handlerLogin = (user) => {
        this.props.onLoginUser(user)
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
        (props.user.firstName ? props.history.goBack() : alert('wrong password'))
    }

    foo = (x) => {
        if (!this.props.user.firstName) {
            return (
                <p>{x}</p>
            )
        } else {
            return (
                <p>{this.props.user.firstName}</p>
            )
        }
    }


    render() {
        return (
            <section>
                <input type="email" placeholder="email" onChange={this.handlerEmail} />
                <input type="password" placeholder="password" onChange={this.handlerPassword} />
                <button onClick={() => this.handlerLogin(this.state.userInfo)}>login</button>
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