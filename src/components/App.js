import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Notepad from './Notepad';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<MuiThemeProvider>
      <Notepad />
    </MuiThemeProvider>
    );
  }
}