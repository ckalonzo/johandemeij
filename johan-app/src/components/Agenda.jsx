import React, {useEffect} from "react";
import {Row} from "react-bootstrap"
import List from "components/shared/List"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
const Agenda  = (props) => {
    useEffect(() => {
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:10,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (<>
    { <section className="agenda">
    <h3 style={{textAlign:'center',fontSize:"2rem"}}>Agenda</h3>
    <div className="container">
         
        {Object.values(props.agendas).map((agenda,i)=> {
          if(i<=5)
            return <List key={i} {...agenda}/>
        })}
        
    </div>
    <h3 style={{textAlign:'center',fontSize:"1rem",textTransform: "capitalize"}}><Link to="/agenda">view full agenda</Link></h3>
    </section> }
    
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
  )(Agenda);
