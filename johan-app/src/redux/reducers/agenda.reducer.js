import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {
};
export default function agendaReducer (state = initialState, action) {
    switch (action.type) {
      
      case ACTIONS.LOAD_CD_AGENDA: {
        let stateCopy = _.cloneDeep(state)
       fetch('http://127.0.0.1:5021/api/loadAgendasByPage/'+action.payload.skip+"/"+action.payload.limit)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,res.data))
          stateCopy.agendaTotal = res.data.length
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_FAIL,err)))
        
        return stateCopy
      }
      case ACTIONS.LOAD_CD_AGENDA_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_CD_AGENDA_FAIL: {

        return state
      }
      case ACTIONS.LOAD_AGENDAS: {
        let d = new Date();
        let day = d.getDay();
        let month = d.getMonth() + 1
        let year = d.getFullYear();
        db.collection("agendas")
       .where("year",'==',"2020")
       .where("month",'>=',"5")
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => doc.data());
           action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,data))
         });
        return state
      }
      case ACTIONS.LOAD_AGENDAS_SUCCESS:{
        let d = new Date();
        let day = d.getDate();
        let stateCopy = []
        action.payload.map(agenda=>{
         // if(agenda.day > day)
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