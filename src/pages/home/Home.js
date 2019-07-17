import React, { Component } from 'react';
import Login from '../../components/log-in/Login';
import Signup from '../../components/sign-up/Signup';
import Axios from 'axios';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedForm: 'sign-in'
    }
  }

  formSelectionHanndler(event) {
    this.setState({
      selectedForm: event.target.name
    })
  }

  onSubmitHandler(event, payload) {
    event.preventDefault();
    if (payload.name === 'sign-in') {
      const data = {
        email: payload.signIn.username,
        password: payload.signIn.password,
      }
      Axios.post('/login', data, { 'Content-Type': 'application/json' }).then((result) => {
        console.log(result);
      })
    } else if (payload.name === 'sign-up') {
      const data = {
        email: payload.signUp.email,
        username: payload.signUp.username,
        password: payload.signUp.password,
        usertype: 'admin'
      }
      Axios.post('/signup', data, { 'Content-Type': 'application/json' }).then((result) => {
        console.log(result);
      })
    }
  }

  render() {
    const { selectedForm } = this.state;
    return (
      <div className="login">
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" name="sign-in" checked={selectedForm === 'sign-in' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" name="sign-up" checked={selectedForm === 'sign-up' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <Login onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
              <Signup onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
