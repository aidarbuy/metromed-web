export default (state = {index:0}, action) => {
  // console.debug("appTabs state:", state);
  switch (action.type) {
    case 'UPDATE_INDEX':
      const newState = {
        ...state, 
        index: action.index,
      }
      // console.debug("appTabs index:", newState.index);
      return newState;

    default:
      return state;
  }
};