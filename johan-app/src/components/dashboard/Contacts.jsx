import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { Button } from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import { Container,Row,Col } from "react-bootstrap"
import SideNav from "components/dashboard/SideNav"
import EditPost from "components/dashboard/EditPost"
const Contacts = (props) => {
    const [section,setSection] = useState("list")
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard | Presentations`;
       props.actions.mainAction(ACTIONS.LOAD_CONTACTS,[])
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

   
    const loadContact = (ID) => {
      props.actions.mainAction(ACTIONS.LOAD_CONTACT,ID)
      props.history.push('/dashboard/contact/'+ID)
    }
    const deleteContact = (ID) => {
      props.actions.mainAction(ACTIONS.DELETE_CONTACT,ID)
      setTimeout(()=>{ 
        window.location.reload()
       }, 1);
    }
    
    const PresentationList = () => {
        return Object.values(props.contacts ? props.contacts:[]).map(contact=>{
          return ( <tr key={""}>
            <td className="post-title" onClick={()=>loadContact()}>{contact.contactName}</td>
            <td className="post-date">{contact.contactSubject}</td>
            <td className="post-date">{contact.date}</td>
            <td className="post-actions">
              <Button  onClick={()=>loadContact(contact.id)} className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></Button> 
              
              <Button variant="danger" onClick={()=>{if(window.confirm("Delete this item?"))deleteContact(contact.id)}} className="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></Button></td>
          </tr> )
        })
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
              <th scope="col" style={{"textAlign":"left"}}>From</th>
              <th scope="col" style={{"textAlign":"left"}}>Subjcect</th>
              <th scope="col" style={{"textAlign":"left"}}>Date</th>
              <th scope="col" style={{"textAlign":"left"}}></th>
            </tr>
          </thead>
          <tbody>
           <PresentationList />
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
      contacts:state.contactUsReducer
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
  )(Contacts);
