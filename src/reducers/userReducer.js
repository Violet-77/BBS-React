const initState = {
  isLogin: false,
  loginUser: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "set-isLogin":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "set-loginUser":
      return {
        ...state,
        loginUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
