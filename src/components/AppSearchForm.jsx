import TextInput from './forms/TextInput';
import PropTypes from 'prop-types';

function AppSearchForm({ onChange, activeKeyword }) {
  return (
    <div className="app-search-form">
      <i className="fa-solid fa-magnifying-glass"></i>
      <TextInput
        placeholder="Find your note"
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
