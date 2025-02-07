import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db, storage } from "../../firebase";
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore"; // Firebase v9 imports
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"; // Firebase Storage v9
import _ from 'lodash';

const initialState = {
    gallery: {},
    galleries: [],
    photos: []
};

export default function galleryReducer(state = initialState, action) {
    switch (action.type) {

        case ACTIONS.LOAD_GALLERY: {
            (async () => {
                try {
                    const galleryQuery = collection(db, "photoGalleryImages");
                    const querySnapshot = await getDocs(galleryQuery);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY_SUCCESS, data));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_GALLERY_SUCCESS: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.gallery = action.payload;
            return stateCopy;
        }

        case ACTIONS.LOAD_GALLERY_FAIL: {
            return state;
        }

        case ACTIONS.LOAD_GALLERIES: {
            (async () => {
                try {
                    const galleriesQuery = collection(db, "photoGallery");
                    const querySnapshot = await getDocs(galleriesQuery);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    console.log(data);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERIES_SUCCESS, data));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERIES_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_GALLERIES_SUCCESS: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.gallery = { ...action.payload[0] };
            return stateCopy;
        }

        case ACTIONS.LOAD_GALLERIES_FAIL: {
            return state;
        }

        case ACTIONS.INSERT_GALLERY_IMAGE: {
            (async () => {
                try {
                    const imageRef = ref(storage, `gallery/${action.payload.name}`);
                    const uploadTask = uploadBytesResumable(imageRef, action.payload.file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // Progress function (optional)
                        },
                        (error) => {
                            console.log(error);
                        },
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log(url);
                            action.asyncDispatch(mainAction(ACTIONS.INSERT_GALLERY_IMAGE_SUCCESS, action.payload));
                        }
                    );
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.INSERT_GALLERY_IMAGE_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.INSERT_GALLERY_IMAGE_SUCCESS: {
            (async () => {
                try {
                    const image = {
                        id: action.payload.id,
                        date: action.payload.date,
                        caption: action.payload.caption,
                        name: action.payload.name
                    };

                    await setDoc(doc(collection(db, "photoGalleryImages")), image);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY, []));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.INSERT_GALLERY_IMAGE_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.INSERT_GALLERY_IMAGE_FAIL: {
            return state;
        }

        case ACTIONS.DELETE_GALLERY_IMAGE: {
            (async () => {
                try {
                    const imageRef = ref(storage, `gallery/${action.payload.name}`);
                    await deleteObject(imageRef);
                    console.log("File deleted");

                    action.asyncDispatch(mainAction(ACTIONS.DELETE_GALLERY_IMAGE_SUCCESS, action.payload));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.DELETE_GALLERY_IMAGE_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.DELETE_GALLERY_IMAGE_SUCCESS: {
            (async () => {
                try {
                    const imageQuery = query(collection(db, "photoGalleryImages"), where("id", "==", action.payload.ID));
                    const querySnapshot = await getDocs(imageQuery);

                    querySnapshot.forEach(async (docSnapshot) => {
                        await deleteDoc(docSnapshot.ref);
                    });

                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY, []));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.DELETE_GALLERY_IMAGE_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.DELETE_GALLERY_IMAGE_FAIL: {
            return state;
        }

        default:
            return state;
    }
}
