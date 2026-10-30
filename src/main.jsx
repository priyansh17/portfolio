import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope/wght.css';
import App from './App.jsx';
import './styles.css';
import { normalizeLegacyHash } from './navigation.js';

normalizeLegacyHash();
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
