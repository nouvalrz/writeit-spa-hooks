import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function FloatingNavigation({ items }) {
  const navigate = useNavigate();

  const clickHandler = (onClick) => {
    if (typeof onClick === 'function') {
      onClick();
    } else if (typeof onClick === 'string') {
      navigate(onClick);
    }
  };

  return (
    <div className="floating-button">
      {items.map((item, index) => {
        const { title, onClick, icon } = item;
        return (
          <React.Fragment key={index}>
            <button
              onClick={() => clickHandler(onClick)}
              className="floating-button__item"
            >
              {icon && <i className={icon}></i>}
              <p>{title}</p>
            </button>
            {index < items.length - 1 && <span>|</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

FloatingNavigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FloatingNavigation;
