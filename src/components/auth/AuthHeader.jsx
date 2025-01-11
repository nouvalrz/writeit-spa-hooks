import { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

function AuthHeader({ children }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="auth-card__header">
      <div className="pill-group">
        <button onClick={toggleTheme} style={{ textTransform: 'capitalize' }}>
          <i
            className={
              theme === 'dark' ? 'fa-regular fa-moon' : 'fa-regular fa-sun'
            }
            style={{ marginRight: '8px' }}
          ></i>
          {locale === 'en' && theme}
          {locale === 'id' && (theme === 'dark' ? 'gelap' : 'terang')}
        </button>
        |
        <button onClick={toggleLocale} style={{ textTransform: 'uppercase' }}>
          <i
            className="fa-solid fa-earth-americas"
            style={{ marginRight: '8px' }}
          ></i>
          {locale}
        </button>
      </div>
      {children}
    </div>
  );
}

export default AuthHeader;
