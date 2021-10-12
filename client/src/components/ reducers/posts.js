const initialState = {
  loading: true,
  error: "",
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...state,
        loading: false,
        posts: action.payload.data
      };
    case "CREATE_POST":
      return {
        ...state,
        loading: false,
        posts: [...posts, action.payload.data],
      };
    default:
      return state;
  }
};

export default posts;