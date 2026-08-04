import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './scss/bootstrap.scss';
import './index.css';
import './banner-themes.css';
import './loader-background.css';
import './about-section.css';
import './about-transition-runtime.css';
import './about-dark-background.css';
import './clean-portfolio-layout.css';

createRoot(document.getElementById('root')).render(<App />);
