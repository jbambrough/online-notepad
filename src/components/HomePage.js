import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import AppBar from 'material-ui/AppBar';
import { hashHistory } from 'react-router'
import Divider from 'material-ui/Divider';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.createNote = this.createNote.bind(this);
    this.noteList = this.noteList.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  openDrawer(a) {
    this.setState({open: !this.state.open})
  }

  noteList(a) {
    hashHistory.push('/noteList');
    this.setState({open: !this.state.open})
  }

  createNote(a) {
    hashHistory.push('/');
    this.setState({open: !this.state.open})
  }

  render() {
    var appBarStyle = {
      backgroundImage: 'url(/img/bg_hdrBG2.png)',
      height: '110px'
    }

    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this.openDrawer} style={appBarStyle} />
        {this.props.children}
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.openDrawer({ open })}
          >
            <MenuItem primaryText='My Notes' onClick={(open) => this.noteList({ open })} leftIcon={<RemoveRedEye />} />
            <MenuItem primaryText='Create New Note' onClick={(open) => this.createNote({ open })} leftIcon={<RemoveRedEye />} />
            <Divider />
            <MenuItem primaryText='Log Out' onClick={(open) => this.openDrawer({ open })} leftIcon={<RemoveRedEye />} />
          </Drawer>
      </div>
    );
  }
}

export default HomePage;