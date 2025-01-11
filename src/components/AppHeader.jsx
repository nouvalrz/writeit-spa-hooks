import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function AppHeader({ name, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  return (
    <>
      <div className="header">
        <Link to={'/'} className="header__brand-logo">
          <img src="/images/write-it-logo.svg" alt="Write It Logo" />
          <p>Write It</p>
        </Link>
        <div className="header__right">
          <button onClick={toggleTheme} style={{ textTransform: 'capitalize' }}>
            <i
              className={
                theme === 'dark' ? 'fa-regular fa-moon' : 'fa-regular fa-sun'
              }
              style={{ marginRight: '8px', fontSize: '1.2rem' }}
            ></i>
            {locale === 'en' && theme}
            {locale === 'id' && (theme === 'dark' ? 'gelap' : 'terang')}
          </button>
          <button onClick={toggleLocale} style={{ textTransform: 'uppercase' }}>
            <i
              className="fa-solid fa-earth-americas"
              style={{ marginRight: '8px', fontSize: '1.2rem' }}
            ></i>
            {locale}
          </button>
          <button onClick={onLogout} style={{ textTransform: 'capitalize' }}>
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              style={{ marginRight: '8px', fontSize: '1.2rem' }}
            ></i>
            {name}
          </button>
        </div>
      </div>
    </>
  );
}

AppHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default AppHeader;
