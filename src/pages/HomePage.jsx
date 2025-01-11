import React from 'react';
import CircleGradient from '../assets/images/circle-gradient.svg';
import AppSearchForm from '../components/AppSearchForm';
import AppNoteList from '../components/AppNoteList';

import FloatingNavigation from '../components/FloatingNavigation';
import autoBind from 'auto-bind';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from '../utils/remote-api';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';

function HomePageWrapper({ archive = false }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('search');

  function changeSearchParams(keyword) {
    setSearchParams({ search: keyword });
  }

  return (
    <HomePage
      onSearch={changeSearchParams}
      activeKeyword={keyword ?? ''}
      archive={archive}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      searchQuery: '',
      isLoading: true,
    };

    autoBind(this);

    this.swalAlert = withReactContent(SwalToast);
  }

  async componentDidMount() {
    this._setLoading(true);
    await this._getNotes();
    this._setLoading(false);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.archive !== this.props.archive) {
      this._setLoading(true);
      await this._getNotes();
      this._setLoading(false);
    }
  }

  async onDeleteNoteHandler(id) {
    const { error, data } = await deleteNote(id);
    if (error) {
      this.swalAlert.fire({ title: data.message, icon: 'error' });
    } else {
      await this._getNotes();
      this.swalAlert.fire({
        title: 'Successfully delete note',
        icon: 'success',
      });
    }
  }

  onSearchChangeHandler(event) {
    const keyword = event.target.value;
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => {
      return {
        searchQuery: keyword,
      };
    });
    this.props.onSearch(keyword);
  }

  async onToggleArchiveNoteHandler(id) {
    const note = this.state.notes.find((note) => note.id === id);

    const { error, data } = note.archived
      ? await unarchiveNote(id)
      : await archiveNote(id);

    if (error) {
      this.swalAlert.fire({ title: data.message, icon: 'error' });
    } else {
      await this._getNotes();
      this.swalAlert.fire({
        title: `Successfully ${note.archive ? 'unarchive' : 'archive'} note`,
        icon: 'success',
      });
    }
  }

  async _getNotes() {
    const { error, data } = this.props.archive
      ? await getArchivedNotes()
      : await getActiveNotes();

    if (error) {
      this.swalAlert.fire({ title: 'Something went wrong', icon: 'error' });
    } else {
      this.setState(() => {
        return {
          notes: data,
        };
      });
    }
  }

  _setLoading(value) {
    this.setState(() => {
      return {
        isLoading: value,
      };
    });
  }

  render() {
    return (
      <>
        <AppSearchForm
          onChange={this.onSearchChangeHandler}
          activeKeyword={this.props.activeKeyword}
        />
        <AppNoteList
          notes={this.state.notes.filter(
            (note) =>
              note.title
                .toLowerCase()
                .indexOf(this.state.searchQuery.toLowerCase()) != -1
          )}
          onDeleteNote={this.onDeleteNoteHandler}
          onToggleNoteArchive={this.onToggleArchiveNoteHandler}
          isLoading={this.state.isLoading}
          archive={this.props.archive}
        />

        <img src={CircleGradient} className="circle-gradient" />
        <FloatingNavigation
          items={[
            !this.props.archive
              ? {
                  title: 'Archive',
                  onClick: '/archive',
                  icon: 'fa-regular fa-folder-open',
                }
              : {
                  title: 'Home',
                  onClick: '/',
                  icon: 'fa-solid fa-house',
                },
            {
              title: 'Add Note',
              onClick: '/new',
              icon: 'fa-solid fa-square-plus',
            },
          ]}
        />
      </>
    );
  }
}

HomePageWrapper.propTypes = {
  archive: PropTypes.bool,
};

HomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  activeKeyword: PropTypes.string.isRequired,
  archive: PropTypes.bool,
};

export default HomePageWrapper;
