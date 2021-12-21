const cartReducer = (state = {}, action) => {
  const payload = action.payload;

  switch (action.type) {
    case "ADD-CART-ITEM":
      console.log("adding");
      return { ...state, [payload._id]: payload };

    case "DELETE-CART-ITEM":
      console.log("deleting");
      delete state[payload];
      return {...state};
    default:
      return state;
  }
};

export default cartReducer;
