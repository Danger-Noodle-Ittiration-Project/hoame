import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './styles/main.scss';
import './styles/directory.scss';
import './styles/announcements.scss';
import './styles/login.scss';
import './styles/dashboard.scss';
import './styles/documents.scss';
import './styles/checkoutform.scss';
import './styles/signup.scss'
import "./styles/roleReassigner.scss";

// get root where it will be render
const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    {/* Wrap your App in BrowserRouter for routing */}
    <App />
  </BrowserRouter>
);
