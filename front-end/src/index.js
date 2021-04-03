import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTHO_DOMAIN;
const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    {/* <Auth0Provider */}
    {/* domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    > */}
    <App />
    {/* </Auth0Provider> */}
  </Provider>,
  document.getElementById("root")
);
