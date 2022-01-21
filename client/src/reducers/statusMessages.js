function statusMessages(state = { success: "", error: "" }, action) {
  switch (action.type) {
    case "SET-SUCCESS-MESSAGE":
      return { ...state, success: action.payload };

    default:
      return state;
  }
}

export default statusMessages;
