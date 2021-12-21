import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";

export let store = createStore(allReducers);
store.subscribe(() => console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
