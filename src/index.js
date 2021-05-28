import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { configSSO } from './sso-config.js'

const config = {
    auth: {
        clientId: configSSO.clientId,
        clientSecret: configSSO.clientSecret,
        redirectUri: configSSO.redirectUri,
        scopes: configSSO.scopes,
    }
};

const publicClientApplication = new PublicClientApplication(config);

publicClientApplication.loginPopup()
    .then(function (loginResponse) {
        // successful login. You can fetch user data here using loginResponse object
        console.log("accountId:", loginResponse.account.homeAccountId)
        console.log("username:", loginResponse.account.name)
        console.log("token:", loginResponse.accessToken)

    }).catch(function (error) {
        console.log("This is an error", error);
    });

ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={publicClientApplication}>
            <App />
        </ MsalProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
