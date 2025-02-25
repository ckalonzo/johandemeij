import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { Button } from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import Parser from 'html-react-parser';
import { Container,Row,Col } from "react-bootstrap"
import SideNav from "components/dashboard/SideNav"
//import { Link } from "react-router-dom";
import EditPost from "components/dashboard/EditPost"
const Submissions = (props) => {
    const [section,setSection] = useState("list")
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard | Presentations`;
       props.actions.mainAction(ACTIONS.LOAD_SUBMISSIONS,[])
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

   
    const loadSubmission = (ID) => {
      props.actions.mainAction(ACTIONS.LOAD_SUBMISSION,ID)
      props.history.push('/dashboard/submissions/edit/'+ID)
    }
    const deleteSubmission = (ID) => {
      props.actions.mainAction(ACTIONS.DELETE_SUBMISSION,ID)
      setTimeout(()=>{ 
        window.location.reload()
       }, 0);
    }
    
    const PresentationList = () => {
        return Object.values(props.submissions ? props.submissions:[]).map(cd =>{
          return ( <tr key={""}>
            <td className="post-title" onClick={()=>loadSubmission()}>{cd.orchestraEnsemble}</td>
            <td className="post-date">{cd.location}</td>
            <td className="post-actions">
              <Button  onClick={()=>loadSubmission(cd.id)} className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></Button> 
              
              <Button  onClick={()=>deleteSubmission(cd.id)} className="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></Button></td>
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
              <th scope="col" style={{"textAlign":"center"}}>Orchestra</th>
              <th scope="col" style={{"textAlign":"center"}}>location</th>
              <th scope="col" style={{"textAlign":"center"}}></th>
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
      submissions:state.concertInformationReducer
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
  )(Submissions);
