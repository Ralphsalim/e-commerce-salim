function clientSecretReducer(state = "", action) {
    
  switch (action.type) {
    case "DELETE-CLIENT-SECRET":
      console.log("deleting");
      return "";
    case "SET-CLIENT-SECRET":
      console.log("seting");
      return action.payload;
    default:
      return state;
  }
}

export default clientSecretReducer;
