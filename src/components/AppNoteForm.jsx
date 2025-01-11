import React from 'react';
import Button from './base/Button';
import TextArea from './forms/TextArea';
import TextInput from './forms/TextInput';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';

class AppNoteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    autoBind(this);
  }

  onTitleChangeHandler(event) {
    const newTitle = event.target.value;
    if (newTitle.length > 50) {
      return;
    }
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => {
      return {
        title: newTitle,
      };
    });
  }

  onBodyChangeHandler(event) {
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => {
      return {
        body: event.target.value,
      };
    });
  }

  onAddNoteHandler(event) {
    event.preventDefault();

    if (this.state.body === '' || this.state.title === '') {
      alert('Fill all input');
      return;
    }

    this.props.onAddNote(this.state);

    // eslint-disable-next-line no-unused-vars
    this.setState((state) => {
      return {
        title: '',
        body: '',
      };
    });
  }

  render() {
    return (
      <div className="app-note-form">
        <h1>What’s on your mind?</h1>
        <p>Write it down here.</p>
        <form onSubmit={this.onAddNoteHandler} className="app-note-form__form">
          <TextInput
            onChange={this.onTitleChangeHandler}
            label="Title"
            type="text"
            className="app-note-form__input"
            value={this.state.title}
          />
          <p className="app-note-form__title-length">
            {this.state.title.length}/50
          </p>
          <TextArea
            onChange={this.onBodyChangeHandler}
            label="Body"
            rows={10}
            className="app-note-form__input"
            value={this.state.body}
          />
          <Button
            title="Save"
            type="submit"
            className="app-note-form__button"
          />
        </form>
      </div>
    );
  }
}

AppNoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AppNoteForm;
