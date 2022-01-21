const cartReducer = (state = {}, action) => {
  const payload = action.payload;

  switch (action.type) {
    case "ADD-CART-ITEM":
      const variantId = payload.variantId;
      return { ...state, [variantId]: payload };

    case "DELETE-CART-ITEM":
      delete state[payload];
      return { ...state };

    case "CLEAR-CART":
      return {};
    default:
      return state;
  }
};

export default cartReducer;
