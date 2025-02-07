import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { getDatabase, ref, set, onValue, remove } from "firebase/database"; // Import Realtime Database functions
const initialState = {};

export default function contactUsReducer(state = initialState, action) {
  const database = getDatabase(); // Initialize Realtime Database

  switch (action.type) {
    case ACTIONS.SUBMIT_CONTACT_INFO: {
      let stateCopy = action.payload;

      // Reference the specific contact node
      const contactRef = ref(database, `contact/${stateCopy.id}`);

      // Set the contact data
      set(contactRef, action.payload)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS, action.payload));
        })
        .catch(() => {
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONTACT_INFO_FAIL, { error: "Could not create contact" }));
        });

      return state;
    }

    case ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.SUBMIT_CONTACT_INFO_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_CONTACTS: {
      // Reference the "contact" node
      const contactsRef = ref(database, 'contact');

      // Listen for changes to the "contact" node
      onValue(contactsRef, (snapshot) => {
        const data = snapshot.val();
        let contacts = [];

        // Convert the data object to an array
        Object.values(data ? data : []).forEach((contact) => {
          contacts.push(contact);
        });

        // Dispatch success action with the contacts data
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACTS_SUCCESS, { ...contacts }));
      });

      return state;
    }

    case ACTIONS.LOAD_CONTACTS_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_CONTACTS_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_CONTACT: {
      // Reference the specific contact node
      const contactRef = ref(database, `contact/${action.payload}`);

      // Listen for changes to the specific contact node
      onValue(contactRef, (snapshot) => {
        const data = snapshot.val();

        // Dispatch success action with the contact data
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACT_SUCCESS, data));
      });

      return state;
    }

    case ACTIONS.LOAD_CONTACT_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_CONTACT_FAIL: {
      return state;
    }

    case ACTIONS.DELETE_CONTACT: {
      // Reference the specific contact node
      const contactRef = ref(database, `contact/${action.payload}`);

      // Remove the contact node
      remove(contactRef)
        .then(() => {
          // Dispatch success action
          action.asyncDispatch(mainAction(ACTIONS.DELETE_CONTACT_SUCCESS, []));
        });

      return state;
    }

    case ACTIONS.DELETE_CONTACT_SUCCESS: {
      // Reload the contacts list after deletion
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACTS, []));
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}