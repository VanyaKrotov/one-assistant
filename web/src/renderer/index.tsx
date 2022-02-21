import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import 'rsuite/dist/rsuite.min.css';
import 'react-splitter-layout/lib/index.css';

import 'renderer/styles/main.css';
import 'renderer/styles/variables.css';

import App from './App';

ReactDOM.render(
  <MemoryRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MemoryRouter>,
  document.getElementById('root')
);
