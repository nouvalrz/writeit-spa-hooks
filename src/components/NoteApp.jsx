import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import DetailPageWrapper from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useEffect, useMemo, useState } from 'react';
import { getUserLogged, putAccessToken } from '../utils/remote-api';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function NoteApp() {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [theme, setTheme] = useState(null);
  const [locale, setLocale] = useState(null);

  useEffect(() => {
    async function getAuthUser() {
      const { data } = await getUserLogged();
      setAuthUser(data);
      setLoading(false);
    }

    getAuthUser();

    setTheme(() => {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      return theme;
    });
    setLocale(localStorage.getItem('locale') || 'en');
  }, []);

  const toggleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevState) => {
      const newLocale = prevState === 'en' ? 'id' : 'en';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

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
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <main>
            <Routes>
              <Route
                path="*"
                element={<LoginPage onLoginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
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
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default NoteApp;
