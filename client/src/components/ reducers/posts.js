const initialState = {
  loading: true,
  error: "",
  posts: [],
  reload: false,
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
        posts: [...state.posts, action.payload.data],
        reload: !state.reload,
      };
    case "DELETE_POST":
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
        reload: !state.reload,
      };
    case "UPDATE_POST":
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => post._id === action.payload.data.id ? action.payload.data : post),
        reload: !state.reload,
      };
    default:
      return state; 
  }
};

export default posts;