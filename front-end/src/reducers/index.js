const initialState = {
  formValues: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORMVALUES":
      return {
        ...state,
        formValues: action.payload,
      };
    // case "SUBMIT_FORM":
    //   console.log("--- Triggered Form submission ---");
    //   console.log("Form Data - ", state.formValues);
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

export const getStoreItemArray = (state) => {
  return Object.values(state);
};
export default reducer;
