import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"
const initialState = {
};
export default function agendaReducer (state = initialState, action) {
    switch (action.type) {
      
      case ACTIONS.LOAD_CD_AGENDA: {
        let stateCopy = _.cloneDeep(state)
       fetch('http://localhost:3001/api/loadAgendas')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,res.data))
          stateCopy.agendaTotal = res.data.length
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_FAIL,err)))
        
        return stateCopy
      }
      case ACTIONS.LOAD_CD_AGENDA_SUCCESS: {
       let stateCopy = []

       _.orderBy(action.payload,['year','month','day'],['desc','desc','desc']).map((agenda,index)=>{
         if(index <= 300)
         return stateCopy.push(agenda)
       })
      stateCopy.total = action.payload.length;
      
        return stateCopy
      }
      case ACTIONS.LOAD_CD_AGENDA_FAIL: {

        return state
      }
      case ACTIONS.LOAD_AGENDAS: {

        fetch ('http://localhost:3001/api/loadfilteredAgendas/'+action.payload)
        .then((data)=> data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,res.data))
        
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_FAIL,err)))
        return state
      }
      case ACTIONS.LOAD_AGENDAS_SUCCESS:{

        return action.payload
      }
      case ACTIONS.LOAD_AGENDAS_FAIL:{
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }