import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from "lodash"
const initialState = {};
export default function orderReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.CREATE_ORDER_LOCATION: {
        let stateCopy = _.cloneDeep(action.payload)
        db.collection("orders")
          .add(stateCopy)
          .then(function(docRef){
            stateCopy._id = docRef.id
            action.asyncDispatch(mainAction(ACTIONS.CREATE_ORDER_LOCATION_SUCCESS,stateCopy))
          });
        return stateCopy
      }
      case ACTIONS.CREATE_ORDER_LOCATION_SUCCESS: {
        return action.payload
      }
      case ACTIONS.DELETE_ORDER_LOCATION:{

        db.collection("orders")
        .where('id','==',action.payload)
         .get()
         .then((querySnapshot) => {
           querySnapshot.forEach((doc)=> doc.ref.delete())
           action.asyncDispatch(mainAction(ACTIONS.DELETE_ORDER_LOCATION_SUCCESS,[]))
         });
       return state
     } 
     case ACTIONS.DELETE_ORDER_LOCATION_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS,[]))
      return  state
    } 
      case ACTIONS.LOAD_ORDER_LOCATIONS: {
      db.collection("orders")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS,data))
      });

        return state
      }
      case ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS: {
        return action.payload ? action.payload : state
      }
      case ACTIONS.LOAD_ORDER_LOCATIONS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_ORDER_LOCATION: {
        db.collection("orders")
        .where("id",'==',action.payload)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATION_SUCCESS,...data))
          });
        return state
      }
      case ACTIONS.LOAD_ORDER_LOCATION_SUCCESS: {
        return action.payload ? action.payload : state
      }
      case ACTIONS.LOAD_ORDER_LOCATION_FAIL: {
        return state
      }
      case ACTIONS.UPDATE_ORDER_LOCATION:{
        console.log(action)
        let stateCopy = _.cloneDeep(action.payload)
        let _id = 
        console.log(stateCopy.id)

        db.collection("orders")
        .where("id",'==',stateCopy.id)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
              _id = doc.id
              return doc.data()});
              console.log(data)
           db.collection("orders").doc(_id)
            .update(stateCopy).then(()=>{
              action.asyncDispatch(mainAction(ACTIONS.UPDATE_ORDER_LOCATION_SUCCESS,stateCopy))
            });
          });
        return state
      }
      case ACTIONS.UPDATE_ORDER_LOCATION_SUCCESS:{
        return action.payload
      }
      default: 
        return {
          ...state
        }
    }
  }