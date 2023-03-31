
const initialState = [
  {
    id: 0,
    name: "Raman sharma",
    phone: 122589625525,
    email: "dgg@gmail.com",

  },
  {
    id: 1,
    name: "Randhir sharma",
    phone: 7324252565525,
    email: "dgdg@gmail.com"


  },
];
const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      state = [...state, action.payload];
      return state;
    case "UPDATE_USER":
      const updateState = state.map(user => user.id === action.payload.id ? action.payload : user);

      state = updateState;
      return state;
    case "DELETE_USER":
      const filterUsers = state.filter(user => user.id !== action.payload && user);
      state = filterUsers;
      return state;

    default: return state;
  }
};
export default Reducers;