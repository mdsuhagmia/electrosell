import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import { ContextApi } from './components/ContextApi.jsx'
import store from './store'
import { Provider } from 'react-redux'
// import app from './firebase.config.js';
// import AuthProvider from './authContext/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ContextApi>
        <App />
      </ContextApi>
    </Provider>
)
