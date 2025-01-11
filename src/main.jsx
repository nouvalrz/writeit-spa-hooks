import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';
import NoteApp from './components/NoteApp';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NoteApp />
  </BrowserRouter>
);
