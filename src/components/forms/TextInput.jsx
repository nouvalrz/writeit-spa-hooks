import { useId } from 'react';

function TextInput({ type, label, placeholder, onChange, className, value }) {
  const id = useId();
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default TextInput;
