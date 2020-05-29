import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"
const initialState = {
   
};
export default function headerReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_HEADER: {
       action.asyncDispatch(mainAction(ACTIONS.LOAD_HEADER_SUCCESS,Object.keys(action.payload).length > 0 ? action.payload : "home"))
        return state
      }
      case  ACTIONS.LOAD_HEADER_SUCCESS: {
      let stateCopy = _.cloneDeep(state)
      stateCopy.name = action.payload
        return stateCopy
      }
      case  ACTIONS.LOAD_HEADER_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }