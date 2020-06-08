import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db,database } from "../../firebase";
const initialState = {
   
};
export default function contactUsReducer (state = initialState, action) {
    switch (action.type) {
 
      case ACTIONS.SUBMIT_CONTACT_INFO: {
        let stateCopy = action.payload
        const contactRef = database.ref('contact')
        contactRef.child(stateCopy.id).set(action.payload).then(()=>{
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS,action.payload))
        })
        .catch(()=>{
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONTACT_INFO_FAIL,{error:"could not create contact"}))
        });
        return state
      }
      case  ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS: {
        return action.payload
      }
      case  ACTIONS.SUBMIT_CONTACT_INFO_FAIL: {

        return state
      }
      case  ACTIONS.LOAD_CONTACTS: {
        var contactsRef = database.ref('contact')
     contactsRef.on('value',(snap,i)=>{
    
      const data = snap.val()
      let contacts =[]
      Object.values(data ? data:[]).map(contact=>{
        contacts.push(contact)
      })
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACTS_SUCCESS,{...contacts}))
      })
        return state
      }
      case  ACTIONS.LOAD_CONTACTS_SUCCESS: {

        return action.payload
      }
      case  ACTIONS.LOAD_CONTACTS_FAIL: {

        return state
      }
      case  ACTIONS.LOAD_CONTACT: {
        var contactRef = database.ref('contact/'+action.payload)
        contactRef.on('value',(snap,i)=>{
        
        const data = snap.val()
         action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACT_SUCCESS,data))
        })
        return state
      }
      case  ACTIONS.LOAD_CONTACT_SUCCESS: {

        return action.payload
      }
      case  ACTIONS.LOAD_CONTACT_FAIL: {

        return state
      }
      case  ACTIONS.DELETE_CONTACT: {
        const contactRef = database.ref('contact/'+action.payload)
        contactRef.remove()
        action.asyncDispatch(mainAction(ACTIONS.DELETE_CONTACT_SUCCESS,[]))
        return state
      }
      case  ACTIONS.DELETE_CONTACT_SUCCESS: {
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CONTACTS,[]))
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }