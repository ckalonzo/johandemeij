import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { database,db } from "../../firebase";
import _ from "lodash"
const initialState = {
};
export default function AllAgendasReducer (state = initialState, action) {
  switch (action.type) {
      
    case ACTIONS.LOAD_ALL_AGENDAS: {
      const agendaYearRef = database.ref('agendas').orderByChild('year').startAt(action.payload).endAt(action.payload)
      agendaYearRef.on('value',(snap,i)=>{
      let d = new Date();
      let month = (d.getMonth() + 1).toString()
      let agendas = []
      const data = snap.val()
      Object.values(data).map(agenda=>{
        agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`
        if(agenda.month >= month || agenda.month >= +month  && agenda.id > 0)
        return agendas.push(agenda)
      })
       action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_AGENDAS_SUCCESS,agendas))
      })
        return state
      }
    case ACTIONS.LOAD_ALL_AGENDAS_SUCCESS: { 
        return _.orderBy(action.payload,['month','day'],['asc','asc'])
    }
    case ACTIONS.LOAD_ALL_AGENDAS_FAIL: {
        return state
    }
    default: 
      return state
    }
  }