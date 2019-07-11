import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Section from './components/section/Section';
import Login from './components/log-in/Login';
import Scrol from './components/scrol/Scrol';

export default class App extends Component {

  constructor(props) {
    super(props);
    const abc = [{ name: 'abc' }, { name: 'rtyu' }, { name: 'sdfgh' }];
  }

  render() {
    return (
      <Scrol />
      // <BrowserRouter>
      //   <React.Fragment>
      //     <Header />
      //     <Route path="/" exact component={Login} />
      //     <Route path="/todos" exact component={Section} />
      //     <Footer />
      //   </React.Fragment>
      // </BrowserRouter>
    )
  }

}
