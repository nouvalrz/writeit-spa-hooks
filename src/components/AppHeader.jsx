import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <>
      <div className="header">
        <Link to={'/'} className="header__brand-logo">
          <img src="/images/write-it-logo.svg" alt="Write It Logo" />
          <p>Write It</p>
        </Link>
      </div>
    </>
  );
}

export default AppHeader;
