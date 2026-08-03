import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './scss/bootstrap.scss';
import './index.css';
import './banner-themes.css';
import './loader-background.css';
import './about-section.css';

createRoot(document.getElementById('root')).render(<App />);
