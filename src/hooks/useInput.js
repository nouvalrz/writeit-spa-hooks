import { useState } from 'react';

function useInput(initalVal) {
  const [input, setInput] = useState(initalVal);

  const onChange = (event) => setInput(event.target.value);

  return [input, onChange];
}

export default useInput;
