import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNotes, deleteNote } from '../actions/index';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { FlatButton } from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import { hashHistory } from 'react-router'

class NotesList extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = { notes: '', snack: false };
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  handleDelete(id) {
    this.props.deleteNote(id, () => {
      this.props.fetchNotes();
      this.setState({snack: true});
    });
  }

  handleEdit(id) {
    hashHistory.push('/' + id);
  }

  render() {
    const notes = this.props.notes[0];

    if (!notes)
      return <div>Loading...</div>

    const style = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: '20px'
      }
    };

    const tileStyle = {
      margin: '10px',
      width: '250px'
    }

    var myNotes = notes.map(function (note, i) {
      let myDate = new Date(note.create_date);
      let dateFormat = `${myDate.getMonth()} / ${myDate.getDate()} / ${myDate.getFullYear()}`;
      return ({
        id: note.id,
        text: note.note_text,
        date: dateFormat,
        user: note.user_name
      });
    })

    const btnStyle = {
      backgroundColor: '#ffab00',
      color: '#ffab00'
    };

    return (
      <div style={style.root}>
        {myNotes.map((note) => (
          <div key={note.id} style={tileStyle}>
            <Card>
              <CardTitle title={note.date} subtitle={note.user} />
              <CardText>{note.text}</CardText>
              <CardActions>
                <RaisedButton
                  buttonStyle={btnStyle}
                  icon={<FontIcon className="material-icons md-18" />}
                  label="Delete"
                  onClick={() => this.handleDelete(note.id)}
                  secondary={true}
                />
                <RaisedButton
                  buttonStyle={btnStyle}
                  icon={<FontIcon className="material-icons md-18" />}
                  label="Edit"
                  onClick={() => this.handleEdit(note.id)}
                  secondary={true}
                />
              </CardActions>
            </Card>
          </div>

        ))}
        <Snackbar
          autoHideDuration={2000}
          message="Note has been Deleted!"
          open={this.state.snack}
        />
      </div>
    );
  }
}

function mapStateToProps({ notes }) {
  return { notes: notes };
}

export default connect(mapStateToProps, { fetchNotes, deleteNote })(NotesList);