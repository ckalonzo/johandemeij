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
        let agendas = []
        let d = new Date();
        let day = d.getDay();
        let month = (d.getMonth() + 1).toString()
        let year = d.getFullYear().toString();

         let stateCopy = ''
         //=======================================================
         db.collection("agendas")
       .where("year",'==',year)
       .where("month",'>=',month)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          stateCopy = data;
  
          //=======================================================
            db.collection("presentations")
           // .where("id","==",stateCopy.cd.toString())
           .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());

              stateCopy.map((post,i)=>{

              let title = data.filter(presentation=>presentation.id===post.cd).map(presentation=>{return presentation.cdName})
             
              return post.title = title[0]
              })

              action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,stateCopy))
            });
          //========================================================
        });



        return state
      }
      case ACTIONS.LOAD_AGENDAS_SUCCESS:{
        let stateCopy = _.cloneDeep(action.payload)
        
        stateCopy.map((agenda,i)=>{
          
          db.collection("presentations")
          .where("id","==",agenda.cd.toString())
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            agenda.title=data[0].cdName
          });
        })

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