import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import PhonesPage from './pages/PhonesPage/PhonesPage'
import HomePage from './pages/HomePage/HomePage'
import PhoneDetails from './pages/PhoneDetails/PhoneDetails'
import LoginPage from './pages/LoginPage/LoginPage'
import CartPage from './pages/CartPage/cartPage'
import SignupPage from './pages/SignupPage/SignupPage'
import * as actionCreators from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.loadPhones();
    this.loadUser();
  }

  loadPhones = () => {
    this.props.onLoadPhones();
  }

  loadUser = () => {
    const user = JSON.parse(localStorage.getItem('user-market-phones'));
    if (user) this.props.onLoginUser(user)
  }

  handlerLogout = () => {
    localStorage.removeItem('user-market-phones')
    this.props.onRemoveUser()
  }

  render() {
    const { user } = this.props
    return (
      <Router>
        <div className="container">
          <NavLink to="/">Home</NavLink> |
          {user.firstName ? (
            <div>
              <NavLink activeClassName="opacity" onClick={this.handlerLogout} to="/login">Logout</NavLink>
            </div>
          ) : (
              <div>
                <NavLink activeClassName="opacity" to="/login">Login</NavLink> |
                <NavLink activeClassName="opacity" to="/signup">sign up</NavLink>
              </div>
            )}
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage}></Route>
          <Route path="/signup" exact component={SignupPage}></Route>
          <Route path="/phone" exact component={PhonesPage} />
          <Route path="/phone/:id" exact component={PhoneDetails} />
          <Route path="/phone/:id/cart" exact component={CartPage}></Route>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

const mapStateToDispatch = dispatch => {
  return {
    onLoginUser: (user) => dispatch(actionCreators.setUser(user)),
    onRemoveUser: () => dispatch(actionCreators.logoutUser()),
    onLoadPhones: () => dispatch(actionCreators.loadPhones())
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
