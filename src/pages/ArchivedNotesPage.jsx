import React from 'react';
import CircleGradient from '../assets/images/circle-gradient.svg';
import AppSearchForm from '../components/AppSearchForm';
import AppArchiveNoteList from '../components/AppArchiveNoteList';

import { deleteNote, getNotes, toggleArchiveNote, searchNote } from '../utils';
import FloatingNavigation from '../components/FloatingNavigation';
import autoBind from 'auto-bind';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function ArchivedNotesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('search');

  function changeSearchParams(keyword) {
    setSearchParams({ search: keyword });
  }

  return (
    <ArchivedNotesPage
      onSearch={changeSearchParams}
      activeKeyword={keyword ?? ''}
    />
  );
}

class ArchivedNotesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: searchNote(this.props.activeKeyword),
      searchQuery: '',
    };

    autoBind(this);
  }

  onDeleteNoteHandler(id) {
    deleteNote(id);
    this._getNotes();
  }

  onSearchChangeHandler(event) {
    const keyword = event.target.value;
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => {
      return {
        notes: searchNote(keyword),
        searchQuery: keyword,
      };
    });
    this.props.onSearch(keyword);
  }

  onToggleArchiveNoteHandler(id) {
    toggleArchiveNote(id);
    this._getNotes();
  }

  _getNotes() {
    this.setState((state) => {
      return {
        ...state,
        notes: getNotes(),
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

        <AppArchiveNoteList
          notes={this.state.notes.filter((item) => item.archived)}
          onDeleteNote={this.onDeleteNoteHandler}
          onToggleNoteArchive={this.onToggleArchiveNoteHandler}
        />

        <img src={CircleGradient} className="circle-gradient" />
        <FloatingNavigation
          items={[
            {
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

ArchivedNotesPage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  activeKeyword: PropTypes.string.isRequired,
};

export default ArchivedNotesPageWrapper;
