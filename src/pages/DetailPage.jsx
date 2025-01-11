import { useNavigate, useParams } from 'react-router-dom';
import { deleteNote, getNoteById, toggleArchiveNote } from '../utils';
import React from 'react';
import NoteCard from '../components/notes/NoteCard';
import autoBind from 'auto-bind';
import FloatingNavigation from '../components/FloatingNavigation';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: null,
    };
    autoBind(this);
  }

  componentDidMount() {
    const note = getNoteById(this.props.id);
    if (!note) {
      setTimeout(() => {
        this.props.navigate('/404');
      }, 1);
      return;
    }
    this.setState({ note });
  }

  onDeleteNoteHandler(id) {
    deleteNote(id);
    this.props.navigate('/');
  }

  onToggleArchiveNoteHandler(id) {
    toggleArchiveNote(id);
    if (this.state.note.archived) {
      this.props.navigate('/');
    } else {
      this.props.navigate('/archive');
    }
  }

  render() {
    if (!this.state.note) {
      return null;
    }

    return (
      <>
        <div className="detail-container">
          <NoteCard
            {...this.state.note}
            onDeleteNote={this.onDeleteNoteHandler}
            withButtons={false}
          />
        </div>
        <FloatingNavigation
          items={[
            {
              title: 'Home',
              onClick: '/',
              icon: 'fa-solid fa-house',
            },
            {
              title: this.state.note.archived ? 'Unarchive' : 'Archive',
              onClick: () =>
                this.onToggleArchiveNoteHandler(this.state.note.id),
              icon: 'fa-regular fa-folder-open',
            },
            {
              title: 'Delete',
              onClick: () => this.onDeleteNoteHandler(this.state.note.id),
              icon: 'fa-solid fa-trash-can',
            },
          ]}
        />
      </>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
