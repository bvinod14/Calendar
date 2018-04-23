import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MonthView from './calender-view';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <MonthView />
      </div>
    );
  }
}

export default App;
