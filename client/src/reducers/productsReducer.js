const productsreducer = (state = null, action) => {
  switch (action.type) {
    case "SET-PRODUCTS":
      return {...state, ...action.payload};

    default:
      return state;
  }
};

export default productsreducer;
