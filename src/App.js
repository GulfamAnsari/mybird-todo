import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Section from './components/section/Section';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Section />
        <Footer />
      </React.Fragment>
    )
  }

}
