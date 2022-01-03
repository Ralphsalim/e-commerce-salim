function loginRedirectReducer(state = "", action) {
  switch (action.type) {
    case "SET-LOGIN-REDIRECT":
      return action.payload;

    default:
      return state;
  }
}

export default loginRedirectReducer;
