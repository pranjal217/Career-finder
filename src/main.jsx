import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/');
  };

  return (
    <Auth0Provider
      domain="dev-hndj7hz0m10y613l.us.auth0.com"
      clientId="hAyuuBCXFU0bv7haYwj1IUBVZNTERSfR"
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
)