export const setproducts = (o) => {
  return { type: "SET-PRODUCTS", payload: o };
};

/*favorite*/
export const addfavourite = (o) => {
  return { type: "ADD-FAVORITE", payload: o };
};
export const deletefavorite = (o) => {
  return { type: "DELETE-FAVORITE", payload: o };
};

/*cart */
export const addcartitem = (o) => {
  return { type: "ADD-CART-ITEM", payload: o };
};

export const deletecartitem = (o) => {
  return { type: "DELETE-CART-ITEM", payload: o };
};

export const setoverlay = (o) => {
  return { type: "SET-OVERLAY", payload: o };
};

//

export const deleteoverlay = (o) => {
  return { type: "DELETE-OVERLAY", payload: o };
};

export const updatecarttotals = (o) => {
  return { type: "UPDATE-TOTALS", payload: o };
};

export const initializecarttotals = (o) => {
  return { type: "INITIALIZE-TOTALS", payload: o };
};

//stripe
export const setclientsecret = (o) => {
  return { type: "SET-CLIENT-SECRET", payload: o };
};

export const deleteclientsecret = (o) => {
  return { type: "DELETE-CLIENT-SECRET", payload: o };
};

/*Collapsable components */
export const updatecollapsables = (o) => {
  return { type: "UPDATE-COLLAPSABLES", payload: o };
};

//user
export const setUser = (o) => {
  return { type: "SET-USER", payload: o };
};

//order
export const updateOrder = (o) => {
  return { type: "UPDATE-ORDER", payload: o };
};

//loginredirect 
export const setloginredirect =(o)=>{ 
  return { type:"SET-LOGIN-REDIRECT", payload:o}
}
