function Button({ title, type, iconClass, className, onClick }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {iconClass && <i className={iconClass}></i>}
      {title && title}
    </button>
  );
}

export default Button;
