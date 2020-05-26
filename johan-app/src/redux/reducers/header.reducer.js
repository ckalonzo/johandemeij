import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"
const initialState = {
    headers:[
        {
          "id": "1",
          "name": "home"
        },
        {
          "id": "2",
          "name": "agenda"
        },
        {
          "id": "3",
          "name": "news"
        },
        {
          "id": "4",
          "name": "music"
        },
        {
          "id": "5",
          "name": "biography"
        },
        {
          "id": "6",
          "name": "photogallery"
        },
        {
          "id": "7",
          "name": "order",
        }
      ]
};
export default function headerReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_HEADER: {
       let stateCopy = _.cloneDeep(state)
       let header = stateCopy.headers.filter(header => header.name === action.payload.navLocation)
       action.asyncDispatch(mainAction(ACTIONS.LOAD_HEADER_SUCCESS,...header))
        return action.navLocation ? action.navLocation: state
      }
      case  ACTIONS.LOAD_HEADER_SUCCESS: {
        return action.payload
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