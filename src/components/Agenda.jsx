import React, {useEffect} from "react";
import {Row} from "react-bootstrap"
import AgendaCard from "components/shared/AgendaCard"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
const Agenda  = (props) => {
    useEffect(() => {
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:4,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
    <section className="agenda">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
         <Row>
        {Object.values(props.agendas).map(agenda => {
            return <AgendaCard {...agenda}/>
        })}
        </Row>
    </div>
    <h3 style={{textAlign:'center',fontSize:"1rem",textTransform: "uppercase"}}><Link to="/agenda">view full agenda</Link></h3>
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
  )(Agenda);
