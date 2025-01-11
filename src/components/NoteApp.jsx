import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import DetailPageWrapper from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useEffect, useState } from 'react';
import { getUserLogged, putAccessToken } from '../utils/remote-api';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function NoteApp() {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    async function getAuthUser() {
      const { data } = await getUserLogged();
      setAuthUser(data);
      setLoading(false);
    }

    getAuthUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();

    setAuthUser(data);
  };

  const onLogout = () => {
    setAuthUser(null);
    putAccessToken('');
  };

  if (loading) {
    return null;
  }

  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route
            path="*"
            element={<LoginPage onLoginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <>
      <header>
        <AppHeader name={authUser.name} onLogout={onLogout}></AppHeader>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<AddPage />} />
          <Route path="/archive" element={<HomePage archive={true} />} />
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
