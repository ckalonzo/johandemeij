import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { Button } from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import Parser from 'html-react-parser';
import { Container,Row,Col } from "react-bootstrap"
import SideNav from "components/dashboard/SideNav"
import Loading from "components/shared/Loading"
//import { Link } from "react-router-dom";
import EditPost from "components/dashboard/EditPost"
const ExtraPages = (props) => {
    const [section,setSection] = useState("list")
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard `;
        //if(props.categories.length === 0)
       props.actions.mainAction(ACTIONS.LOAD_PAGES,[])
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = () => {
      props.history.push('/dashboard/cds/new')
      window.location.reload()
    }
    const loadPage = (ID,PAGE) => {
        if(PAGE === 'soren')
      console.log(ID)
       props.actions.mainAction(ACTIONS.LOAD_PAGE,ID)
       props.history.push('/dashboard/'+PAGE+'/'+ID)
    }
    const Pagelist = () => {
        console.log(Object.values(props.pages).length)
      if(Object.values(props.pages).length > 0)
        return Object.values(props.pages).map(page =>{
            console.log(page)
          return ( <tr key={page.id}>
            <td className="post-title">{page.title}</td>
            <td className="post-actions">
              <Button  onClick={()=>loadPage(page.id,page.title)} className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></Button> 
            
            <Button className="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></Button></td>
          </tr> )
        })
        return  <tr><td colspan={3}><Loading /></td></tr>
    }
  
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
              <th scope="col" style={{"textAlign":"center"}}>Page</th>
              <th scope="col" style={{"textAlign":"center"}}></th>
            </tr>
          </thead>
          <tbody> 
           <Pagelist />
          </tbody>
        </table>
            </Col>
        </Row>
    </Container>
            
            </>)
   
    
    
}

function mapStateToProps(state) {
    return {
      pages:state.pageReducer
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
  )(ExtraPages);
