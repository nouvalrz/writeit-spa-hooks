import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import NoteCard from '../components/notes/NoteCard';
import autoBind from 'auto-bind';
import FloatingNavigation from '../components/FloatingNavigation';
import PropTypes from 'prop-types';
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from '../utils/remote-api';
import { ClipLoader } from 'react-spinners';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';

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
      isPageLoading: false,
      isDeleteLoading: false,
      isArchiveLoading: false,
    };
    this.swalAlert = withReactContent(SwalToast);
    autoBind(this);
  }

  async componentDidMount() {
    this._setLoading('isPageLoading', true);
    const { data } = await getNote(this.props.id);

    if (data) {
      this.setState({ note: data });
    } else {
      this.props.navigate('/404');
    }
    this._setLoading('isPageLoading', false);
  }

  async onDeleteNoteHandler(id) {
    this._setLoading('isDeleteLoading', true);

    const { error, data } = await deleteNote(id);
    if (error) {
      this.swalAlert.fire({ title: data.message, icon: 'error' });
    } else {
      this.props.navigate('/');
      this.swalAlert.fire({
        title: 'Successfully delete note',
        icon: 'success',
      });
    }
    this._setLoading('isDeleteLoading', false);
  }

  async onToggleArchiveNoteHandler(id) {
    this._setLoading('isArchiveLoading', true);

    const { error, data } = this.state.note.archived
      ? await unarchiveNote(id)
      : await archiveNote(id);

    if (error) {
      this.swalAlert.fire({ title: data.message, icon: 'error' });
    } else {
      if (this.state.note.archived) {
        this.props.navigate('/');
        this.swalAlert.fire({
          title: 'Successfully unarchive note',
          icon: 'success',
        });
      } else {
        this.props.navigate('/archive');
        this.swalAlert.fire({
          title: 'Successfully archive note',
          icon: 'success',
        });
      }
    }
    this._setLoading('isArchiveLoading', false);
  }

  _setLoading(key, value) {
    this.setState(() => {
      return {
        [key]: value,
      };
    });
  }

  render() {
    if (!this.state.note) {
      return <ClipLoader color="white" />;
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
        {!this.state.isPageLoading && (
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
                isLoading: this.state.isArchiveLoading,
              },
              {
                title: 'Delete',
                onClick: () => this.onDeleteNoteHandler(this.state.note.id),
                icon: 'fa-solid fa-trash-can',
                isLoading: this.state.isDeleteLoading,
              },
            ]}
          />
        )}
      </>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
