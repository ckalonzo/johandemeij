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
      console.log(agenda)
            let title = props.CDS.filter(CD=>CD.id===agenda.cd).map(CD=>CD.cdName),
                title1 = props.CDS.filter(CD=>CD.id===agenda.cd1).map(CD=>CD.cdName),
                title2 = props.CDS.filter(CD=>CD.id===agenda.cd2).map(CD=>CD.cdName),
                title3 = props.CDS.filter(CD=>CD.id===agenda.cd3).map(CD=>CD.cdName)

            agenda.title = title[0]
            agenda.title1 = title1[0]
            agenda.title2 = title2[0]
            agenda.title3 = title3[0]
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
