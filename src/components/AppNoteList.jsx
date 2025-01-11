import { ClipLoader } from 'react-spinners';
import EmptyNoteMessage from './notes/EmptyNoteMessage';
import NoteList from './notes/NoteList';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function AppNoteList({
  notes,
  onDeleteNote,
  onToggleNoteArchive,
  isLoading,
  archive = false,
}) {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  if (isLoading) {
    return (
      <div className="note-list">
        <h2>
          {locale === 'en' && (archive ? 'Archived Notes' : 'Active Notes')}
          {locale === 'id' && (archive ? 'Catatan Arsip' : 'Catatan Aktif')}
        </h2>
        <div>
          <ClipLoader
            loading={isLoading}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="note-list">
      <h2>
        {locale === 'en' && (archive ? 'Archived Notes' : 'Active Notes')}
        {locale === 'id' && (archive ? 'Catatan Arsip' : 'Catatan Aktif')}
      </h2>

      {notes.length === 0 ? (
        <EmptyNoteMessage />
      ) : (
        <NoteList
          notes={notes}
          onDeleteNote={onDeleteNote}
          onToggleNoteArchive={onToggleNoteArchive}
        />
      )}
    </div>
  );
}

AppNoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onToggleNoteArchive: PropTypes.func.isRequired,
};

export default AppNoteList;
