import { useId } from 'react';

function TextArea({ label, onChange, rows, className, value }) {
  const id = useId();
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        onChange={onChange}
        rows={rows}
        value={value}
      ></textarea>
    </div>
  );
}

export default TextArea;
