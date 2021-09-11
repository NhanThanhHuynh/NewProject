export const authReducer = ( state, action ) => {
  const {
    type,
    payload: { isAuthticated, user },
  } = action;
  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthticated,
        user,
      };
    default:
      return state;
  }
};
