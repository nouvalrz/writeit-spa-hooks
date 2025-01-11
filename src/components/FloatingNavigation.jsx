import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './base/Button';

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
        const { title, onClick, icon, isLoading } = item;
        return (
          <React.Fragment key={index}>
            <Button
              isLoading={isLoading}
              onClick={() => clickHandler(onClick)}
              className="floating-button__item"
              iconClass={icon}
              title={title}
            />

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
