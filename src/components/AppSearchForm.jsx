import { useContext } from 'react';
import TextInput from './forms/TextInput';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function AppSearchForm({ onChange, activeKeyword }) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="app-search-form">
      <i className="fa-solid fa-magnifying-glass"></i>
      <TextInput
        placeholder={locale === 'en' ? 'Find your note' : 'Cari catatan mu'}
        className="app-search-form__input"
        onChange={onChange}
        value={activeKeyword}
      />
    </div>
  );
}

AppSearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeKeyword: PropTypes.string.isRequired,
};

export default AppSearchForm;
