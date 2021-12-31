const defaultState = [
  {
    name: "personal-info",
    isEditable: false,
    isCurrent: true,
  },

  {
    name: "billing-info",
    isEditable: false,
    isCurrent: false,
  },
  {
    name: "payment-info",
    isEditable: false,
    isCurrent: false,
  },
];

const Collapsablereducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE-COLLAPSABLES":
      let current = state[action.payload.current];
      let next = state[action.payload.next];
      console.log(action.payload);
      state[action.payload.current] = {
        ...current,
        isCurrent: false,
        isEditable: true,
      };
      state[action.payload.next] = { ...next, isCurrent: true };
      return [...state];

    default:
      return state;
  }
};

export default Collapsablereducer;
