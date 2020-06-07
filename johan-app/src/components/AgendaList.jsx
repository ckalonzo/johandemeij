import React,{useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import Paginate from "components/shared/Paginate"
import List from "components/shared/List"
const AgendaList  = (props) => {
    
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Agenda"
        props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:100,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    let d = new Date();
    let day = d.getDate();
    let month = (d.getMonth() + 1).toString()
    let year = d.getFullYear().toString();
 
    
    return (<>
    <section className="agenda-full">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
        
    {Object.values(props.agendas).map(agenda => {

            let title = props.CDS.filter(CD=>CD.id===agenda.cd).map(CD=>CD.cdName)
            agenda.title = title[0]
          //  if(agenda.ON_OFF === /2)
          console.log(agenda.ON_OFF)
          
            return +agenda.ON_OFF  === 1 ? <List key={agenda.id} {...agenda}/>:""
        })}
        
        {props.length > 20 ? <Paginate  {...props}/>:""}
    </div>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer,
        CDS:state.musicReducer.allPresentations
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
            mainAction
        },
        dispatch
      )
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgendaList);
