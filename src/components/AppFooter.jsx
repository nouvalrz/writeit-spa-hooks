import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function AppFooter() {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="app-footer">
      <p>
        {locale === 'en'
          ? 'Made with curiosity - 2024 by Nouval Rizky'
          : 'Diciptakan dengan penasaran - 2024 oleh Nouval Rizky'}
      </p>
    </div>
  );
}

export default AppFooter;
