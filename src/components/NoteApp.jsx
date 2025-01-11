import { Route, Routes } from 'react-router-dom';
import ActiveNotesPage from '../pages/ActiveNotesPage';
import AddPage from '../pages/AddPage';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import ArchivedNotesPage from '../pages/ArchivedNotesPage';
import DetailPageWrapper from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';

function NoteApp() {
  return (
    <>
      <header>
        <AppHeader></AppHeader>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ActiveNotesPage />} />
          <Route path="/new" element={<AddPage />} />
          <Route path="/archive" element={<ArchivedNotesPage />} />
          <Route path="/note/:id" element={<DetailPageWrapper />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        <AppFooter></AppFooter>
      </footer>
    </>
  );
}

export default NoteApp;
