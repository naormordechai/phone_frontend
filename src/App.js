import React, { Component } from 'react';
import PhoneService from './services/PhoneService'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import PhonesPage from './pages/PhonesPage/PhonesPage'
import HomePage from './pages/HomePage/HomePage'
import PhoneDetails from './pages/PhoneDetails/PhoneDetails'
import LoginPage from './pages/LoginPage/LoginPage'
import CartPage from './pages/CartPage/cartPage'
import * as actionCreatorsUser from './store/actions/indexUser'
import * as actionCreators from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onLoadPhones();
    const user = JSON.parse(localStorage.getItem('user-market-phones'));
    if (user) {
      this.props.onLoginUser(user)
    }
  }

  handlerLogout = () => {
    localStorage.removeItem('user-market-phones')
    this.props.onRemoveUser()
  }

  render() {
    return (
      <Router>
        <div className="container">
          {this.props.user.firstName}
          <Link to="/">Home</Link>
          {!!!this.props.user.firstName ? <Link onClick={this.foo} className="link" to="/login">Login</Link> : <Link onClick={this.handlerLogout} to="/login">Logout</Link>}
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage}></Route>
          <Route path="/phone" exact component={PhonesPage} />
          <Route path="/phone/:id" exact component={PhoneDetails} />
          <Route path="/phone/:id/cart" exact component={CartPage} />
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
    onLoginUser: (user) => dispatch(actionCreatorsUser.setUser(user)),
    onRemoveUser: () => dispatch(actionCreatorsUser.logoutUser()),
    onLoadPhones: () => dispatch(actionCreators.loadPhones())

  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
