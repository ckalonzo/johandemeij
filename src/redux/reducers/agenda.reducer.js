import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function agendaReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_CD_AGENDA: {
       fetch('http://localhost:3001/api/loadAgendas')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_CD_AGENDA_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_CD_AGENDA_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }