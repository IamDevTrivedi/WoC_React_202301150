import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './Context/AppContext';
import { EditorTryProvider } from './Context/EditorTryContext';
import { EditorProvider } from './Context/EditorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  < EditorTryProvider >
    < EditorProvider >
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </EditorProvider>
  </EditorTryProvider>
);