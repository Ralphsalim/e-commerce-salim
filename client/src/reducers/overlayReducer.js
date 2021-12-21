function overlayReducer(state = null, action) {
  switch (action.type) {
    case "SET-OVERLAY":
      return action.payload;

    case "DELETE-OVERLAY":
      return null;
    default:
      return state;
  }
}

export default overlayReducer;
