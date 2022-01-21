function paymentIntentReducer(state='', action) {
  switch (action.type) {
    case "SET-PAYMENT-INTENT-ID":
      return action.payload;

    default:
      return state;
  }
}

export default paymentIntentReducer;
