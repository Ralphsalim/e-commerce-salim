import { combineReducers } from "redux";
import { setproducts } from "../actions";
import favoritesreducer from "./favoritesReducers";
import productsreducer from "./productsReducer";
import cartReducer from "./cartReducer";
import overlayReducer from "./overlayReducer";
import updateCartTotalas from "./cartTotalsReducers";
import cartTotalsReducers from "./cartTotalsReducers";
import clientSecretReducer from "./clientSecretReducer";
import Collapsablereducer from "./collapsableReducer";
import userReducer from "./userReducer";
import ordersReducer from "./ordersreducer";

const allReducers = combineReducers({
  user: userReducer,
  favorites: favoritesreducer,
  products: productsreducer,
  cart: cartReducer,
  overlay: overlayReducer,
  totals: cartTotalsReducers,
  client_Secret: clientSecretReducer,
  collapsables_Controller: Collapsablereducer,
  currentOrder: ordersReducer,
});

export default allReducers;
