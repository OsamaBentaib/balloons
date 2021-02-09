import React from "react";
import ReactDOM from "react-dom";
import "./assets/sass/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, Store, applyMiddleware } from "redux";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
import { createClient, Provider as UrqlProvider } from "urql";
import { proxyURL } from "./utils";
const store: Store<InitialState, any> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));
const client = createClient({
  url: proxyURL,
});
ReactDOM.render(
  <Provider store={store}>
    <UrqlProvider value={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UrqlProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
