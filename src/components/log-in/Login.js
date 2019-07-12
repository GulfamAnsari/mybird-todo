import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedForm: 'sign-in',
      signIn: {
        username: '',
        password: '',
        remebmer: false
      },
      signUp: {
        username: '',
        password: '',
        repeat: '',
        email: ''
      }
    }
  }

  formSelectionHanndler(event) {
    this.setState({
      selectedForm: event.target.name
    })
  }

  signInOnChangeHandler(event) {
    const { signIn } = this.state;
    if (event.target.name === 'remebmer') {
      signIn[event.target.name] = event.target.checked;
    } else {
      signIn[event.target.name] = event.target.value;
    }
    this.setState({
      signIn
    });
  }

  signUpOnChangeHandler(event) {
    const { signUp } = this.state;
    signUp[event.target.name] = event.target.value;
    this.setState({
      signUp
    });

  }

  onSubmitHandler(event) {
    event.preventDefault();
    console.log(this.state);
    if (event.target.name === 'sign-in') {
      console.log(this.state.signIn)
    } else if (event.target.name === 'sign-up') {
      console.log(this.state.signUp)
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
              <form onSubmit={this.onSubmitHandler.bind(this)} className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input required onChange={this.signInOnChangeHandler.bind(this)} id="user" name="username" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input required onChange={this.signInOnChangeHandler.bind(this)} id="pass" type="password" name="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <input onChange={this.signInOnChangeHandler.bind(this)} id="check" type="checkbox" name="remebmer" className="check" />
                  <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                </div>
                <div className="group">
                  <input type="submit" className="button" name="sign-in" value="Sign In" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <Link to="/todos">Use App without Login</Link>
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <a href="#forgot">Forgot Password?</a>
                </div>

              </form>
              <form onSubmit={this.onSubmitHandler.bind(this)} className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input required onChange={this.signUpOnChangeHandler.bind(this)} id="user" name="username" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="password" name="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Repeat Password</label>
                  <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="password" name="repeat" className="input" data-type="password" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Email Address</label>
                  <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="text" name="email" className="input" />
                </div>
                <div className="group">
                  <input type="submit" className="button" name="sign-up" value="Sign Up" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
