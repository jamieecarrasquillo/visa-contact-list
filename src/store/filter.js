const SEARCH_INPUT = 'SEARCH_INPUT';

export const setSearchInput = (input) => ({ type: SEARCH_INPUT, input });

let initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INPUT:
      return action.input;
    default:
      return state;
  }
};

export default filterReducer;
