import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import HomePage from '../components/HomePage';
import NoteForm from '../containers/NoteForm';
import NotesList from '../containers/NotesList';
import { Router, Route, IndexRoute } from 'react-router';
import AppBar from 'material-ui/AppBar';

class Notepad extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    injectTapEventPlugin();
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  openDrawer() {
    this.setState({open: true})
  }

  render() {
    return (
      <div>
        <Router>
          <Route path='/' component={HomePage}>
            <IndexRoute component={NoteForm} />
            <Route path='/noteList' component={NotesList} />
            <Route path='/:id' component={NoteForm} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default Notepad;