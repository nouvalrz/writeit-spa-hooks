import { ClipLoader } from 'react-spinners';

function Button({
  title,
  type,
  iconClass,
  className,
  onClick,
  isLoading = false,
  loadingColor = '#141414',
}) {
  return (
    <button
      className={className}
      type={type}
      onClick={isLoading ? null : onClick}
      disabled={isLoading}
    >
      <ClipLoader loading={isLoading} color={loadingColor} />
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
