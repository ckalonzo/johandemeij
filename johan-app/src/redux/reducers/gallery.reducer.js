import {
    ACTIONS
} from 'redux/actions/types.js'
import {
    mainAction
} from "redux/actions/index.actions"
import {
    db,
    storage
} from "../../firebase";
const initialState = {
    gallery: {},
    galleries:[],
    photos: []
};
export default function galleryReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_GALLERY: {
            db.collection("photoGalleryImages")
               // .where("galleryId", "==", action.payload)
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY_SUCCESS, data))
                });
            return state
        }
        case ACTIONS.LOAD_GALLERY_SUCCESS: {
            state.gallery = action.payload
            return state
        }

        case ACTIONS.LOAD_GALLERY_FAIL: {

            return state
        }
        case ACTIONS.LOAD_GALLERIES: {
            db.collection("photoGallery")
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    console.log(data)
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERIES_SUCCESS, data))
                });
            return state
        }
        case ACTIONS.LOAD_GALLERIES_SUCCESS: {
            state.gallery = {...action.payload[0]}
            return state
        }

        case ACTIONS.LOAD_GALLERIES_FAIL: {

            return state
        }

        case ACTIONS.DELETE_GALLERY: {

            return state
        }

        case ACTIONS.DELETE_GALLERY_SUCCESS: {

            return state
        }

        case ACTIONS.DELETE_GALLERY_FAIL: {

            return state
        }


        case ACTIONS.UPDATE_GALLERY: {

            return state
        }

        case ACTIONS.UPDATE_GALLERY_SUCCESS: {

            return state
        }

        case ACTIONS.UPDATE_GALLERY_FAIL: {

            return state
        }


        case ACTIONS.INSERT_GALLERY_IMAGE: {

            
              let postImageRef = storage.ref('gallery/'+action.payload.name).put(action.payload.file);
              postImageRef.on('state_changed',(snapshot)=>{
                //progress function
              },(error)=>{
                //error
                console.log(error)
              },()=>{
                //complete
                storage.ref('gallery/').child(action.payload.name).getDownloadURL().then(url=>{
                  console.log(url)
                  action.asyncDispatch(mainAction(ACTIONS.INSERT_GALLERY_IMAGE_SUCCESS,action.payload))
                })
              })
       
            return state
        }

        case ACTIONS.INSERT_GALLERY_IMAGE_SUCCESS: {
            let image = {
                id: action.payload.id,
                date:action.payload.date,
                caption: action.payload.caption,
               // file: action.payload.path,
                name:action.payload.name
              }
            db.collection("photoGalleryImages")
            .doc()
            .set(image)
            .then(() => {
                action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY,[]))
            });
            return state
        }

        case ACTIONS.INSERT_GALLERY_IMAGE_FAIL: {

            return state
        }

        case ACTIONS.DELETE_GALLERY_IMAGE: {
        let postImageRef = storage.ref('gallery/'+action.payload.name)
        postImageRef.delete().then(()=>console.log("file deleted"));
        action.asyncDispatch(mainAction(ACTIONS.DELETE_GALLERY_IMAGE_SUCCESS, action.payload))  
            return state
        }

        case ACTIONS.DELETE_GALLERY_IMAGE_SUCCESS: {
            db.collection("photoGalleryImages")
            .where("id","==",action.payload.ID)
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=> doc.ref.delete())
                action.asyncDispatch(mainAction(ACTIONS.LOAD_GALLERY,[]))
            })

            return state
        }

        case ACTIONS.DELETE_GALLERY_IMAGE_FAIL: {

            return state
        }


        case ACTIONS.UPDATE_GALLERY_IMAGE: {

            return state
        }

        case ACTIONS.UPDATE_GALLERY_IMAGE_SUCCESS: {

            return state
        }

        case ACTIONS.UPDATE_GALLERY_IMAGE_FAIL: {

            return state
        }


        default:
            return state

    }
}