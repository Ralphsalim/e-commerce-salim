import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";

export let store = createStore(allReducers);
store.subscribe(() => console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<App></App>}></Route>
        <Route path="/products/:productId" element={<ProductPage></ProductPage>} />
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
