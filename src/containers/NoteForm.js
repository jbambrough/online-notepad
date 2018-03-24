import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { createNote, getNote, updateNote } from '../actions/index';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';


class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.state = { snack: false, value: '', id: '' };
  }

  componentDidMount() {
    let id = this.props.params.id;
    if (this.props.params.id) {
      this.props.getNote(id, (res) => {
        let note = res.data[0];
        this.setState({value: note.note_text, id: note.id})
      })
    }
  }

  saveNote(event) {
    event.preventDefault();
    let noteField = document.getElementById('myNote');

    if (this.state.id) {
      this.props.updateNote(this.state.id, noteField.value, (res) => {
        this.setState({ snack: true, value: '', id: '' });
      });
    } else {
      this.props.createNote(noteField.value, (res) => {
        this.setState({ snack: true, value: '' });
      });
    }
  }

  onChange(e) {
    let newValue = e.target.value;
    this.setState({ value: newValue });
  }

  openDrawer() {
    this.props.openDrawer();
  }

  render() {
    const style = {
      border: '2px solid #ffab00',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '25px',
      padding: '25px',
      width: '400px'
    };

    const btnStyle = {
      backgroundColor: '#ffab00',
      color: '#ffab00'
    }

    return <div style={style}>
      <form onSubmit={this.saveNote}>
        <TextField
          id="myNote"
          floatingLabelText="Enter your Note here..."
          fullWidth={true}
          hintText="Hint goes here"
          multiLine={true}
          onChange={this.onChange}
          rows={2}
          value={this.state.value}
        />
        <RaisedButton
          buttonStyle={btnStyle}
          label="Save Note"
          onClick={this.saveNote}
          primary={true}
        />
      </form>
      <Snackbar
        autoHideDuration={2000}
        message="Note has been saved!"
        open={this.state.snack}
      />
    </div>
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

export default reduxForm({validate, form: "NotesNewForm"})(connect(null, { createNote, getNote, updateNote })(NoteForm));