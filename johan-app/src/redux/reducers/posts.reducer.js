import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"; // Import Firestore functions

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_POSTS: {
      let stateCopy = '';

      // Query the "posts" collection with filters and ordering
      const postsQuery = query(
        collection(db, "posts"),
        where("showPost", "==", "1"),
        orderBy("postDate", "desc")
      );

      getDocs(postsQuery)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          stateCopy = data;

          // Query the "postimages" collection
          const imagesQuery = query(collection(db, "postimages"));
          getDocs(imagesQuery)
            .then((querySnapshot) => {
              const imagesData = querySnapshot.docs.map((doc) => doc.data());

              // Map images to posts
              stateCopy.map((post, i) => {
                stateCopy[i].image = imagesData.filter((image) => image.albumID === stateCopy[i].ID);
              });

              // Dispatch success action
              action.asyncDispatch(mainAction(ACTIONS.LOAD_POSTS_SUCCESS, stateCopy));
            });
        });

      return state;
    }

    case ACTIONS.LOAD_POSTS_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_POSTS_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_DASHBOARD_POSTS: {
      let stateCopy = '';

      // Query the "posts" collection with ordering
      const postsQuery = query(collection(db, "posts"), orderBy("postDate", "desc"));

      getDocs(postsQuery)
        .then((snapshotChanges) => {
          const data = snapshotChanges.docs.map((doc) => doc.data());
          stateCopy = data;

          // Query the "postimages" collection
          const imagesQuery = query(collection(db, "postimages"));
          getDocs(imagesQuery)
            .then((querySnapshot) => {
              const imagesData = querySnapshot.docs.map((doc) => doc.data());

              // Map images to posts
              stateCopy.map((post, i) => {
                stateCopy[i].image = imagesData.filter((image) => image.albumID === stateCopy[i].ID);
              });

              // Dispatch success action
              action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS, stateCopy));
            });
        });

      return state;
    }

    case ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS: {
      let stateCopy = action.payload;
      return stateCopy;
    }

    case ACTIONS.LOAD_DASHBOARD_POSTS_FAIL: {
      return state;
    }

    default:
      return state;
  }
}