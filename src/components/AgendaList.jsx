import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import {Row} from "react-bootstrap"
import AgendaCard from "components/shared/AgendaCard"
import Paginate from "components/shared/Paginate"
const Agendas = (props) => {
        const { agendas } = props
        return Object.values(agendas).map(agenda =>{
            if(agenda.orchestra && agenda.orchestra.indexOf('test')===-1)
            return Object.keys(agenda).length > 0 ? <AgendaCard key={agenda._id} {...agenda} display={6}/>:"Loading..."
            return null
        })
    }

const AgendaList  = (props) => {
    //const { agendas } = props.agenda
    const [agendItem,setAgendaItem] = useState()
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Agenda"
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,0)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return (<>
    <section className="agenda">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
         <Row>
             <Agendas {...props}/>
        </Row>
        <Paginate  {...props}/>
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