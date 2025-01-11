import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AppHeader({ name, onLogout }) {
  return (
    <>
      <div className="header">
        <Link to={'/'} className="header__brand-logo">
          <img src="/images/write-it-logo.svg" alt="Write It Logo" />
          <p>Write It</p>
        </Link>
        <button onClick={onLogout}>
          {name}
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            style={{ color: 'red', marginLeft: '8px' }}
          ></i>
        </button>
      </div>
    </>
  );
}

AppHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default AppHeader;
