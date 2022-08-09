import React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import DownloadTable from './components/DownloadTable';
import reportWebVitals from './reportWebVitals';
import { download } from './data/download';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <DownloadTable download={download}/>
  </React.StrictMode>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
