import NoteCard from './NoteCard';
import PropTypes from 'prop-types';

function NoteList({ notes, onDeleteNote, onToggleNoteArchive }) {
  return (
    <div className="note-list__items-wrapper">
      {notes.map((note) => (
        <NoteCard
          {...note}
          key={note.id}
          onDeleteNote={onDeleteNote}
          onToggleNoteArchive={onToggleNoteArchive}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onToggleNoteArchive: PropTypes.func.isRequired,
};

export default NoteList;
