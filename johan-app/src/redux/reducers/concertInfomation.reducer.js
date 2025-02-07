import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { getDatabase, ref, set, onValue, remove } from "firebase/database"; // Import Realtime Database functions

const initialState = {};

export default function concertInformationReducer(state = initialState, action) {
  const database = getDatabase(); // Initialize Realtime Database

  switch (action.type) {
    case ACTIONS.SUBMIT_CONCERT_INFORMATION: {
      let stateCopy = action.payload;

      // Reference the specific submission node
      const submissionRef = ref(database, `submissions/${stateCopy.id}`);

      // Set the submission data
      set(submissionRef, action.payload)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS, action.payload));
        })
        .catch(() => {
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION_FAIL, { error: "Could not create submission" }));
        });

      return state;
    }

    case ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.SUBMIT_CONCERT_INFORMATION_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_SUBMISSIONS: {
      // Reference the "submissions" node
      const submissionsRef = ref(database, 'submissions');

      // Listen for changes to the "submissions" node
      onValue(submissionsRef, (snapshot) => {
        const data = snapshot.val();
        let submissions = [];

        // Convert the data object to an array
        Object.values(data ? data : []).forEach((submission) => {
          submissions.push(submission);
        });

        // Dispatch success action with the submissions data
        action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSIONS_SUCCESS, submissions));
      });

      return state;
    }

    case ACTIONS.LOAD_SUBMISSIONS_SUCCESS: {
      return { ...action.payload };
    }

    case ACTIONS.LOAD_SUBMISSIONS_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_SUBMISSION: {
      // Reference the specific submission node
      const submissionRef = ref(database, `submissions/${action.payload}`);

      // Listen for changes to the specific submission node
      onValue(submissionRef, (snapshot) => {
        const data = snapshot.val();

        // Dispatch success action with the submission data
        action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSION_SUCCESS, data));
      });

      return state;
    }

    case ACTIONS.LOAD_SUBMISSION_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_SUBMISSION_FAIL: {
      return state;
    }

    case ACTIONS.DELETE_SUBMISSION: {
      // Reference the specific submission node
      const submissionRef = ref(database, `submissions/${action.payload}`);

      // Remove the submission node
      remove(submissionRef)
        .then(() => {
          // Dispatch success action
          action.asyncDispatch(mainAction(ACTIONS.DELETE_SUBMISSION_SUCCESS, []));
        });

      return state;
    }

    case ACTIONS.DELETE_SUBMISSION_SUCCESS: {
      // Reload the submissions list after deletion
      action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSIONS, []));
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}