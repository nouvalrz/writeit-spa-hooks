import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils';
import Button from '../base/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';

function NoteCard({
  id,
  title,
  body,
  archived,
  createdAt,
  onDeleteNote,
  onToggleNoteArchive,
  withButtons = true,
}) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isArchiveLoading, setIsArchiveLoading] = useState(false);
  return (
    <div className="note-card">
      <Link className="note-card__title" to={`/note/${id}`}>
        {title}
      </Link>
      <p className="note-card__date">{showFormattedDate(createdAt)}</p>
      <p className="note-card__body">{body}</p>
      {withButtons && (
        <>
          <div className="note-card__actions">
            <Button
              onClick={() => {
                setIsArchiveLoading(true);
                onToggleNoteArchive(id);
              }}
              className="note-card_archive-button"
              title={archived ? 'Unarchive' : 'Archive'}
              isLoading={isArchiveLoading}
              loadingColor="white"
            />
            <Button
              onClick={() => {
                setIsDeleteLoading(true);
                onDeleteNote(id);
              }}
              className="note-card_delete-button"
              iconClass="fa-regular fa-trash-can"
              loadingColor="white"
              isLoading={isDeleteLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func,
  onToggleNoteArchive: PropTypes.func,
  withButtons: PropTypes.bool,
};

export default NoteCard;
