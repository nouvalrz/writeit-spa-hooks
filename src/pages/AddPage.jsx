import AppNoteForm from '../components/AppNoteForm';
import CircleGradient from '../assets/images/circle-gradient.svg';
import { addNote } from '../utils';
import { useNavigate } from 'react-router-dom';
import FloatingNavigation from '../components/FloatingNavigation';
function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    addNote(note);
    navigate('/');
  }

  return (
    <>
      <AppNoteForm onAddNote={onAddNoteHandler} />
      <img src={CircleGradient} className="circle-gradient" />
      <FloatingNavigation
        items={[
          {
            title: 'Home',
            onClick: '/',
            icon: 'fa-solid fa-house',
          },
        ]}
      />
    </>
  );
}

export default AddPage;
