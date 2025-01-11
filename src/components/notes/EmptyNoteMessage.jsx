import { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

function EmptyNoteMessage() {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="empty-note">
      <div className="empty-note__wrapper">
        <i className="fa-solid fa-circle-info"></i>
        <p>{locale === 'en' ? 'No notes' : 'Tidak ada catatan'}</p>
      </div>
    </div>
  );
}

export default EmptyNoteMessage;
