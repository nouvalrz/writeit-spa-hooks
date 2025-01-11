import AppNoteForm from '../components/AppNoteForm';
import CircleGradient from '../assets/images/circle-gradient.svg';
import { useNavigate } from 'react-router-dom';
import FloatingNavigation from '../components/FloatingNavigation';
import { useContext, useState } from 'react';
import { addNote } from '../utils/remote-api';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';
import LocaleContext from '../contexts/LocaleContext';
function AddPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const swalAlert = withReactContent(SwalToast);
  const { locale } = useContext(LocaleContext);

  const onAddNoteHandler = async (note) => {
    setIsLoading(true);
    const { error, data } = await addNote(note);

    if (error) {
      swalAlert.fire({ title: data.message, icon: 'error' });
    } else {
      swalAlert.fire({
        title:
          locale === 'en'
            ? 'Successfully add new note'
            : 'Berhasil menambah catatan',
        icon: 'success',
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <>
      <AppNoteForm onAddNote={onAddNoteHandler} isLoading={isLoading} />
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
