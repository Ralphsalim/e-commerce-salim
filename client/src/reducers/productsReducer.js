const productsreducer = (state = {}, action) => {
  switch (action.type) {
    case "SET-PRODUCTS":
      return action.payload;

    default:
      return state;
  }
};

export default productsreducer;
