import React,{useEffect,useState} from "react";
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
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:100,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    let d = new Date();
    let thisMonth = d.getMonth() + 1
    return (<>
    <section className="agenda-full">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
        
    {Object.values(props.agendas).map(agenda => {
            return <List {...agenda}/>
        })}
        
        {props.length > 20 ? <Paginate  {...props}/>:""}
    </div>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer
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
