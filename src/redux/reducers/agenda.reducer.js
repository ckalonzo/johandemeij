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
        let d = new Date();
        let day = d.getDay();
        let month = d.getMonth() + 1
        let year = d.getFullYear();
        fetch ('http://localhost:3001/api/loadfilteredAgendas/'+action.payload.skip+"/"+action.payload.limit+"/"+year+"/"+month)
        .then((data)=> data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,res.data))
        
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_FAIL,err)))
        return state
      }
      case ACTIONS.LOAD_AGENDAS_SUCCESS:{
        let d = new Date();
        let day = d.getDate();
        let stateCopy = []
        console.log(d.getDate())
        action.payload.map(agenda=>{
          if(agenda.day > day)
          return stateCopy.push(agenda)
        })
        return stateCopy
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