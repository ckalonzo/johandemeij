import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { Button } from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import { Container,Row,Col } from "react-bootstrap"
import SideNav from "components/dashboard/SideNav"
import Loading from "components/shared/Loading"
import EditPost from "components/dashboard/EditPost"
import CleanUpText from "utils/helperFunctions"
const Agendas = (props) => {
    const [section,setSection] = useState("list")
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard | posts`;
       props.actions.mainAction(ACTIONS.LOAD_DASHBOARD_CD_AGENDA,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = () => {
      props.history.push('/dashboard/agenda/new')
    }
    const loadAgenda = (id) => {
      props.history.push('/dashboard/agenda/'+id)
    }
    const deleteAgenda = (id) => {
      props.actions.mainAction(ACTIONS.DELETE_AGENDA,id)
    }
    const PostList = (props) => {
     if(Object.values(props).length >0)
    return Object.values(props).map(agenda =>{
          return ( <tr key={agenda.id}>
            <td className="post-title" onClick={()=>loadAgenda(agenda)}>{CleanUpText(agenda.orchestra)}</td>
            <td className="post-conductor">{CleanUpText(agenda.conductor)}</td>
            <td className="post-city">{CleanUpText(agenda.city)}</td>
            <td className="post-date">{`${agenda.month} / ${agenda.day} / ${agenda.year}`}</td>
            <td className="post-actions">
              <Button  onClick={()=>loadAgenda(agenda.id)} className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></Button> 
              
              <Button onClick={()=>{if(window.confirm("Delete this item?"))deleteAgenda(agenda.id)}}className="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></Button></td>
          </tr> )
        })
      return <tr><td colspan={5}><Loading /></td></tr>
    }
    if(section === "list") {
        return (<>
        <Container   className="dashboard">
        <Row>
            <Col lg={{span:2}}>
               <SideNav />
            </Col>
            <Col lg={{span:10}}>
            <table className="table table-hover">
          <thead >
            <tr>
              <th scope="col" style={{"textAlign":"center"}}>Orchestra</th>
              <th scope="col" style={{"textAlign":"center"}}>Conductor</th>
              <th scope="col" style={{"textAlign":"center"}}>City</th>
              <th scope="col" style={{"textAlign":"center"}}>Date</th>
              <th scope="col" style={{"textAlign":"center"}}><a href="/dashboard/agenda/new" className="btn btn-primary">New Agenda</a></th>
            </tr>
          </thead>
          <tbody>
           <PostList {...props.agendas}/>
          </tbody>
        </table>
            </Col>
        </Row>
    </Container>
            </>)
    } else if (section==="edit") {
        return (<EditPost />)
    } else {
        return null
    }
    
}

function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer,
        allAgendas:state.AllAgendasReducer
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
  )(Agendas);
