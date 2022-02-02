const purchasesreducer = (state = [], action) => {
  switch (action.type) {
    case "SET-PURCHASES":
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default purchasesreducer;
