import EmptyNoteMessage from './notes/EmptyNoteMessage';
import NoteList from './notes/NoteList';
import PropTypes from 'prop-types';

function AppActiceNoteList({ notes, onDeleteNote, onToggleNoteArchive }) {
  return (
    <div className="note-list">
      <h2>Active Notes</h2>
      {notes.length != 0 ? (
        <NoteList
          notes={notes}
          onDeleteNote={onDeleteNote}
          onToggleNoteArchive={onToggleNoteArchive}
        />
      ) : (
        <EmptyNoteMessage />
      )}
    </div>
  );
}

AppActiceNoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onToggleNoteArchive: PropTypes.func.isRequired,
};

export default AppActiceNoteList;
