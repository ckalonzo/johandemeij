import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db , database } from "../../firebase";
const initialState = {};
export default function concertInformationReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.SUBMIT_CONCERT_INFORMATION: {
     let stateCopy = action.payload
     
      const submissionRef = database.ref('submissions')
      submissionRef.child(stateCopy.id).set(action.payload).then(()=>{
        action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS,action.payload))
      })
      .catch(()=>{
        action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION_FAIL,{error:"could not create submission"}))
      });
        return state
      }
      case ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS: {

        return action.payload
      }
      case ACTIONS.SUBMIT_CONCERT_INFORMATION_FAIL: {

        return state
      }
      case ACTIONS.LOAD_SUBMISSIONS: {

     var submissionRef = database.ref('submissions')
     submissionRef.on('value',(snap,i)=>{
    
      const data = snap.val()
      let submissions =[]
      Object.values(data ? data : []).map(submission=>{
        submissions.push(submission)
      })
      action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSIONS_SUCCESS,submissions))
      })
     
        return state
      }
      case ACTIONS.LOAD_SUBMISSIONS_SUCCESS: {
        return {...action.payload}
      }
      case ACTIONS.LOAD_SUBMISSIONS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_SUBMISSION: {
       
        var submissionRef = database.ref('submissions/'+action.payload)
        submissionRef.on('value',(snap,i)=>{
        
        const data = snap.val()
         action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSION_SUCCESS,data))
        })
        return state
      }
      case ACTIONS.LOAD_SUBMISSION_SUCCESS: {

        return action.payload
      }
      case ACTIONS.LOAD_SUBMISSION_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }