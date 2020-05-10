import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"
const initialState = {
};
export default function AllAgendasReducer (state = initialState, action) {
    switch (action.type) {
      
      case ACTIONS.LOAD_ALL_AGENDAS: {

        let stateCopy = _.cloneDeep(state)
       fetch('https://johandemeij.com/api/api/loadAllAgendas')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_AGENDAS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_AGENDAS_FAIL,err)))
        
        return stateCopy
      }
      case ACTIONS.LOAD_ALL_AGENDAS_SUCCESS: {

       let stateCopy = []

       _.orderBy(action.payload,['year','month','day'],['desc','desc','desc']).map((agenda,index)=>{
         if(index <= 300)
         return stateCopy.push(agenda)
       })
     // stateCopy.total = action.payload.length;
      
        return stateCopy
      }
      case ACTIONS.LOAD_ALL_AGENDAS_FAIL: {

        return state
      }
      default: 
        return {
          ...state
        }
    }
  }