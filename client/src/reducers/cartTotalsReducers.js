function cartTotalsReducers(state = { total: 0, quantity: 0 }, action) {
  let quantity = 0;
  let finalTotal = 0;

  switch (action.type) {
    //deletes item if it exists or creates one if it doesnot
    case "INITIALIZE-TOTALS":
      const variantId = action.payload.variantId;
      const price = action.payload.price;
      const id = action.payload.id;
      const color = action.payload.color;
      const size = action.payload.size;

      if (state[variantId]) {
        console.log("122");
        state.total = state.total - state[variantId].total;
        state.quantity = state.quantity - state[variantId].quantity;
        delete state[variantId];
        return { ...state };
      } else {
        console.log("running");
        state[variantId] = {
          total: price,
          price: price,
          quantity: 1,
          id: id,
          color,
          size,
        };

        Object.keys(state).forEach((key) => {
          if (key === "total" || key === "quantity" || key === "undefined")
            return;
          quantity += state[key].quantity;
          finalTotal = finalTotal + state[key].total;
        });

        state.total = finalTotal;
        state.quantity = quantity;

        return { ...state };
      }

    case "UPDATE-TOTALS":
      let variantid = action.payload.id;

      if (action.payload.action === "increment") {
        state[variantid].quantity += 1;
        state.quantity += 1;
      } else if (action.payload.action === "decrement") {
        state[variantid].quantity -= 1;
        state.quantity -= 1;
      }

      Object.keys(state).forEach((key) => {
        if (key === "total" || key === "quantity" || key === "undefined")
          return;
        state[key].total = state[key].price * state[key].quantity;
        finalTotal = finalTotal + state[key].total;
      });

      state.total = finalTotal;

      return { ...state };

    case "CLEAR-TOTALS":
      return { total: 0, quantity: 0 };

    default:
      return state;
  }
}

export default cartTotalsReducers;
