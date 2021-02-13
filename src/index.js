import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
require('dotenv').config()

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    identityPoolId:process.env.IDENTITY_POOL_ID,
    userPoolWebClientId:process.env.APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REGION,
    bucket: process.env.BUCKET,
    identityPoolId: process.env.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "products",
        endpoint: process.env.URL,
        region: process.env.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
