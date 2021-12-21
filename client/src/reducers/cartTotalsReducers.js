function cartTotalsReducers(state = { total: 0, quantity: 0 }, action) {
  let quantity = 0;
  let finalTotal = 0;

  switch (action.type) {
    //deletes item if it exists or creates one if it doesnot
    case "INITIALIZE-TOTALS":
      const id = action.payload.id;
      const price = action.payload.price;

    

      if (state[id]) {
        console.log('122')
        state.total = state.total - state[id].total;
        state.quantity = state.quantity - state[id].quantity;
        delete state[id];
        return { ...state };

      } else {
        console.log("running");
        state[id] = { total: price, price: price, quantity: 1 };

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
      let _id = action.payload.id;

      if (action.payload.action === "increment") {
        state[_id].quantity += 1;
        state.quantity += 1;
      } else if (action.payload.action === "decrement") {
        state[_id].quantity -= 1;
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

    default:
      return state;
  }
}

export default cartTotalsReducers;
