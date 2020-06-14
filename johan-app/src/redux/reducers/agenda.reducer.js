import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { database,db} from "../../firebase";
import _ from 'lodash'
const initialState = {
};
let d = new Date();
let day = d.getDate();
let month = d.getMonth()+1;
let year = d.getFullYear()
console.log(day)
export default function agendaReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_AGENDA:{
      console.log(action)
     
     const agendaRef = database.ref('agendas/'+action.payload.id)
    agendaRef.set(action.payload).then(()=>{
      action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_AGENDA_SUCCESS,action.payload))
    })
    .catch(()=>{
      action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_AGENDA_FAIL,{error:"could not creat agenda"}))
    });
   
    return state
    }
    case ACTIONS.CREATE_NEW_AGENDA_SUCCESS:{
    return action.payload
    }
    case ACTIONS.DELETE_AGENDA:{
    db.collection("agendas")
    .where('id','==',action.payload)
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc)=> doc.ref.delete())
       action.asyncDispatch(mainAction(ACTIONS.DELETE_AGENDA_SUCCESS,[]))
     });

    return state
    }  
    case ACTIONS.DELETE_AGENDA_SUCCESS:{
    action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS,[]))
    return state
    }  
    case ACTIONS.LOAD_CD_AGENDA: {


    db.collection("agendas")
    .where("year","==",year.toString())
    .orderBy("month","asc")
    .get()
    .then(snapshot => {
      const data = snapshot.docs.map(doc => {return doc.data()});
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,data))
    })
      

    return state
    }
    case ACTIONS.LOAD_CD_AGENDA_SUCCESS: {
    return _.orderBy(action.payload,['month','day'],['asc','asc'])
    }
    case ACTIONS.LOAD_CD_AGENDA_FAIL: {

    return state
    }
    case ACTIONS.LOAD_AGENDAS: {

    db.collection("agendas")
    .where("year","==",year.toString())
    .orderBy("month","asc")
    .get()
    .then(snapshot => {
      const data = snapshot.docs.map(doc => {return doc.data()});
      let agendas = []
      Object.values(data).map(agenda=>{
        agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`
        agenda.month = +agenda.month
       // console.log(agenda.month ,">=", month ,"&&", +agenda.day.replace(/^0+/, '') ,">", day)
       if(+agenda.month >= +month )
        return agendas.push(agenda)
      })
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS,agendas))
    })
    return state
    }
    case ACTIONS.LOAD_AGENDAS_SUCCESS:{

    return action.payload
    }
    case ACTIONS.LOAD_AGENDAS_FAIL:{
    return state
    }
    case ACTIONS.LOAD_AGENDAS_FILTERED:{
    //   let d = new Date();
    // let month = (d.getMonth() + 1).toString()
    // let year = d.getFullYear().toString();

    // const agendaYearRef = database.ref('agendas').orderByChild('year').startAt(action.payload.year).endAt(action.payload.year)
    // agendaYearRef.on('value',(snap,i)=>{

    // let agendas = []
    // const data = snap.val()
    //   Object.values(data).map(agenda=>{
    //     agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`
    //     agenda.month = +agenda.month
    //     return agendas.push(agenda)
    //   })
    //   action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,_.orderBy(agendas,['month','day'],['asc','asc'])))
    // })

    db.collection("agendas")
    .where("year","==",action.payload.year.toString())
    .orderBy("month","asc")
    .get()
    .then(snapshot => {
      let agendas = []
      const data = snapshot.docs.map(doc => {return doc.data()});
      Object.values(data).map(agenda=>{
        agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`
        agenda.month = +agenda.month
        return agendas.push(agenda)
      })
      action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS,_.orderBy(agendas,['month','day'],['asc','asc'])))
    })
    return state
    }
    case ACTIONS.LOAD_AGENDAS_FILTERED:{
      return action.payload
    }
    case ACTIONS.LOAD_AGENDA:{
    let stateCopy = []
    var agendaRef = database.ref('agendas/'+action.payload)
     agendaRef.on('value',(snap,i)=>{
    const data = snap.val()
    if(data) 
    action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA_SUCCESS,{...data}))
      
    })
    var agendaRef = database.ref('agendas').orderByChild('id').startAt(action.payload).endAt(action.payload)
     agendaRef.on('child_added',(snap,i)=>{
    const data = snap.val()
    stateCopy = data
    if(stateCopy)
    action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA_SUCCESS,{...stateCopy}))
      
    })
    return {...stateCopy}
    }
    case ACTIONS.LOAD_AGENDA_SUCCESS:{
    return action.payload
    }
    case ACTIONS.LOAD_AGENDA_FAIL:{
    return state
    }
    case ACTIONS.UPDATE_AGENDA:{
      // const agendaRef = database.ref('agendas')
      // agendaRef.child(action.payload.id).update(action.payload)
      // .then(()=>{
      //   action.asyncDispatch(mainAction(ACTIONS.UPDATE_AGENDA_SUCCESS,action.payload))
      // }).catch(()=>{
      //   action.asyncDispatch(mainAction(ACTIONS.UPDATE_AGENDA_FAIL,{error:"failed to update agenda"}))
      // })
      console.log(action)
      let _id =''
      db.collection("agendas")
    .where("id","==",action.payload.id)
    .get()
    .then(snapshot => {
      const data = snapshot.docs.map(doc => {
        _id = doc.id
        return doc.data()});
        console.log(_id)
        db.collection("agendas").doc(_id)
        .update(action.payload).then(()=>{
          console.log("success")
        action.asyncDispatch(mainAction(ACTIONS.UPDATE_AGENDA_SUCCESS,action.payload))
     });
    })
     
    return state
    }
    case ACTIONS.UPDATE_AGENDA_SUCCESS:{
    let stateCopy = _.cloneDeep(action.payload)
    action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA,stateCopy.id))
    return stateCopy
    }
    case ACTIONS.UPDATE_AGENDA_FAIL:{
   
    return state
    }
    default: 
      return {
        ...state
    }
  }
}