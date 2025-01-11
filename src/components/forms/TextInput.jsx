import { useId } from 'react';

function TextInput({ type, label, placeholder, onChange, className, value }) {
  const id = useId();
  return (
    <div className={`${className || ''}`}>
      {label && (
        <label htmlFor={id} className={`app-label ${label}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`app-input`}
      />
    </div>
  );
}

export default TextInput;
