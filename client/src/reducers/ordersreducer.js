const ordersReducer = (state = {}, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "UPDATE-ORDER":
      console.log(payload.property);
      return { ...state, [payload.property]: payload.value };

    default:
      return state;
  }
};

export default ordersReducer;
