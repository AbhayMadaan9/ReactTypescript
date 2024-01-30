import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ErrorBoundary from './ErrorBoundary'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
    <App />
    </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);


