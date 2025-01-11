import { ClipLoader } from 'react-spinners';
import EmptyNoteMessage from './notes/EmptyNoteMessage';
import NoteList from './notes/NoteList';
import PropTypes from 'prop-types';

function AppNoteList({
  notes,
  onDeleteNote,
  onToggleNoteArchive,
  isLoading,
  archive = false,
}) {
  if (isLoading) {
    return (
      <div className="note-list">
        <h2>{archive ? 'Archived Notes' : 'Active Notes'}</h2>
        <div>
          <ClipLoader loading={isLoading} color="white" />
        </div>
      </div>
    );
  }
  return (
    <div className="note-list">
      <h2>{archive ? 'Archived Notes' : 'Active Notes'}</h2>

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
