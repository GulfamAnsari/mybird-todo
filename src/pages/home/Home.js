import React, { Component } from 'react';
import Login from '../../components/log-in/Login';
import Signup from '../../components/sign-up/Signup';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as hlp from '../../helper/helper-functions';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedForm: 'sign-in',
      error: ''
    }
  }

  componentDidMount = () => {
    const token = hlp.getCookie('token');
    if (token) {
      jwt.verify(token, 'secretkey23456', (err, decoded) => {
        const now = Date.now().valueOf() / 1000;
        if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        } else {
          this.getUserData(decoded.email);
        }
      });
    }
    // this.getUserData('gulfam@paytm.com');
  };

  getUserData(email) {
    Axios.post('https://mybird-todo.herokuapp.com/get-data', { email: email }, { 'Content-Type': 'application/json' }).then((result) => {
      const tasks = JSON.parse(result.data)['tasks'];
      this.props.fetchTasks(tasks);
      setTimeout(() => {
        this.props.history.push({ pathname: '/todos' });
      }, 1000);
    })
    // const tasks = [{ title: 'abc', 'priority': 'high' }];
    // this.props.fetchTasks(tasks);
    // setTimeout(() => {
    //   this.props.history.push({ pathname: '/todos' });
    // }, 1000);
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
      this.gotoDashboard('/login', data);
    } else if (payload.name === 'sign-up') {
      const data = {
        email: payload.signUp.email,
        username: payload.signUp.username,
        password: payload.signUp.password,
        usertype: 'admin',
        tasks: []
      }
      this.gotoDashboard('/signup', data);
    }
  }

  gotoDashboard(url, data) {
    Axios.post('https://mybird-todo.herokuapp.com' + url, data, { 'Content-Type': 'application/json' }).then((result) => {
      if (result.data) {
        this.getUserData(JSON.parse(result.data)['email']);
      } else if (!result.data && url === '/signup') {
        this.setState({
          error: 'User Already Exists.'
        });

      } else if (!result.data && url === '/login') {
        this.setState({
          error: 'Please check your email and password'
        });
      }
    })
  }

  render() {
    const { selectedForm, error } = this.state;
    return (
      <div className="login">
        <div className="login-wrap">
          <div className="login-html">
            <p style={{ color: '#8e0428f7' }}>{error}</p>
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


const mapStateToProps = (state) => {
  return {
    taskState: state.taskState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: (tasks) => dispatch(actions.fetchTasks(tasks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
