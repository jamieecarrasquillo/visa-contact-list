const SORT_TRIGGER = 'SORT_TRIGGER';
const CHANGE_SORT = 'CHANGE_SORT';

export const setSortTrigger = (trigger) => ({ type: SORT_TRIGGER, trigger });
export const changeSortTrigger = (trigger) => ({ type: CHANGE_SORT, trigger });

const initialState = false;

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_TRIGGER:
      return action.trigger;
    case CHANGE_SORT:
      return !action.trigger;
    default:
      return state;
  }
};

export default sortReducer;
