import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {
};
export default function agendaReducer (state = initialState, action) {
    switch (action.type) {
      
      case ACTIONS.LOAD_CD_AGENDA: {
      //   let stateCopy = _.cloneDeep(state)
      //  fetch('http://127.0.0.1:5021/api/loadAgendasByPage/'+action.payload.skip+"/"+action.payload.limit)
      //   .then((data) => data.json())
      //   .then((res) => {
      //     action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,res.data))
      //     stateCopy.agendaTotal = res.data.length
      //   }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_FAIL,err)))
      db.collection("agendas")
      .where("year","==","2020")
      .orderBy('month','asc')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,data))
      });
      

      //   let stateCopy = []
      //   db.collection("agendas")
      //   .where("year","==","2020")
      //   .orderBy('month')
      //  .get()
      //  .then(querySnapshot => {
      //    const data = querySnapshot.docs.map(doc => doc.data());
      //    let x =  action.payload.limit - action.payload.skip;
      //    console.log(x)
      //    data.map((newData,i)=>{
      //      if(i < action.payload.limit && i > action.payload.skip)
      //      stateCopy.push(newData)
      //    })
      //    action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,stateCopy))
      //  });
      // db.collection("agendas")
      // .where("year","==","2020")
      // .orderBy('month')
      // .get()
      // .then(querySnapshot => {
      //   const data = querySnapshot.docs.map(doc => doc.data());
      //   action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,data))
      // });
      
        return state
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
       //.where("year",'==',year)
      .where("month",'>=',month)
      .orderBy("month","asc")
      .orderBy("day","asc")
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
              post.title = title[0]; 
              post.date=`${post.year}-${post.month}-${post.day}`
              return post
              })

              action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,stateCopy))
            });
          //========================================================
        });



        return state
      }
      case ACTIONS.LOAD_AGENDAS_SUCCESS:{
        let stateCopy = _.cloneDeep(action.payload)
        let d = new Date();
        let year = d.getFullYear().toString();
        
       
        return stateCopy.filter(agendas=>agendas.year === year)
      }
      case ACTIONS.LOAD_AGENDAS_FAIL:{
        return state
      }
      case ACTIONS.LOAD_AGENDA:{
       
        db.collection("agendas")
      .where("id","==",action.payload)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        
        if(data.length > 0){
        action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA_SUCCESS,data))
      } else {
         action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA_FAIL,{error:"Failed to retrieve agenda"}))
      }
       
      });
      return state
      }
      case ACTIONS.LOAD_AGENDA_SUCCESS:{
        return {...action.payload[0]}
      }
      case ACTIONS.LOAD_AGENDA_FAIL:{
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }