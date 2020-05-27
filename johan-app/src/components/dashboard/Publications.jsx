import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import Parser from 'html-react-parser';
//import { Link } from "react-router-dom";
import EditPost from "components/dashboard/EditPost"
import { Container,Row,Col } from "react-bootstrap"
import SideNav from "components/dashboard/SideNav"
import Paginate from "components/shared/Paginate"
const Posts = (props) => {
    const [section,setSection] = useState("list")
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard | Presentations`;
        //if(props.categories.length === 0)
       props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,[])
       props.actions.mainAction(ACTIONS.LOAD_PRESENTATIONS,{limit:10,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = () => {
      props.history.push('/dashboard/publicatons/new')
    }
    const loadPost = (id) => {
    //  props.actions.mainAction(ACTIONS.EDIT_POST,post)
      props.history.push('/dashboard/publications/edit/'+id)
    }

    const PresentationList = () => {
      let categoryList = ["","Compositions","Amstel Classics","Music for the Theatre","Symphony Orchestra","The Music of SØren Hyldgaard","Solo Concertos"]
        return Object.values(props.presentations).map(presentation =>{
          return ( <tr key={presentation.id}>
            <td className="post-title"><a href={`/dashboard/publications/edit/${presentation.id}`} >{presentation.cdName}</a></td>
            <td className="post-date">{Parser(presentation.totalTime)}</td>
            <td className="post-category">{categoryList[presentation.category]}</td>

            <td className="post-actions">
              <a href={`/dashboard/publications/edit/${presentation.id}`} className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a> 
            
            <button className="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></td>
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
              <th scope="col" style={{"textAlign":"center"}}>Title</th>
              <th scope="col" style={{"textAlign":"center"}}>Time</th>
              <th scope="col" style={{"textAlign":"center"}}>Category</th>
              <th scope="col" style={{"textAlign":"center"}}><a href="/dashboard/publications/new" className="btn btn-success">New Publication</a></th>
            </tr>
          </thead>
          <tbody>
           <PresentationList />
          </tbody>
        </table>
        <Paginate items={props.allpresentations} action={"LOAD_PRESENTATIONS"} limit={10}/>
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
      posts:state.postsReducer,
      presentations:state.presentationsReducer,
      allpresentations:state.AllPresentationsReducer
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
  )(Posts);
