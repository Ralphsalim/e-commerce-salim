const favoritesreducer = (state = new Map(), action) => {
  const payload = action.payload;
  switch (action.type) {
    case "ADD-FAVORITE":
      return { ...state, [payload._id]: payload };

    case "DELETE-FAVORITE":
      delete state[payload];
      return { ...state };

    
    default:
      return state;
  }
};

export default favoritesreducer;
