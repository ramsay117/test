function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "SUB":
      return state - 1;
  }
}

export default reducer;
