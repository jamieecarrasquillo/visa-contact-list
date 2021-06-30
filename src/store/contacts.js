import { contacts } from './mock-contacts';

// Action Types
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';

// Initial State
const initialState = contacts;

// Action Creators
export const addContact = (contact) => ({ type: ADD_CONTACT, contact });
export const removeContact = (contactId) => ({
  type: REMOVE_CONTACT,
  contactId
});
export const updateContact = (contact) => ({ type: UPDATE_CONTACT, contact });

// Reducer
const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.contact];
    case REMOVE_CONTACT:
      return state.filter((contact) => contact.id !== action.contactId);
    case UPDATE_CONTACT:
      let stateCopy = [...state];
      let found = false;
      stateCopy.forEach((contact) => {
        if (contact.id === action.contact.id) {
          contact.first_name = action.contact.first_name;
          contact.last_name = action.contact.last_name;
          contact.email = action.contact.email;
          contact.phone = action.contact.phone;

          found = true;
        }
      });

      if (!found) throw new Error('Contact was not found.');
      return stateCopy;
    default:
      return state;
  }
};

export default contactsReducer;
