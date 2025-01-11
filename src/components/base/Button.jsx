import { ClipLoader } from 'react-spinners';
import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

function Button({
  title,
  type,
  iconClass,
  className,
  onClick,
  isLoading = false,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={className}
      type={type}
      onClick={isLoading ? null : onClick}
      disabled={isLoading}
    >
      <ClipLoader
        loading={isLoading}
        color={theme === 'dark' ? 'white' : 'black'}
      />
      {!isLoading ? (
        <>
          {iconClass && <i className={iconClass}></i>}
          {title && title}
        </>
      ) : null}
    </button>
  );
}

export default Button;
