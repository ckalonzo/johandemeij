import React,{ useEffect , useState} from "react";
import {Table,Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
const RentalCatalogue  = (props) => {
  //const [selectedPresentation,setSelectedPresentation]= useState()
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music"
       props.actions.mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE,{})
       props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadProfile = (id) =>{
      let selectedPresentation =[]
      props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE_BY_ID,id)
      selectedPresentation = props.presentations.filter(presentation => presentation.id === id)
      //props.history.push('/music/profile/'+selectedPresentation[0]._id)
      console.log(selectedPresentation[0]._id)
  }
  const missingProfile = () => {
    alert("profile not yet linked")
  }
    return (<>
    <section className="RentalCatalogue">
    
    <Container>
         <Row>
         <Col lg={{span:12}}>
             <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Catalogue No.</th>
      <th>Title</th>
      <th>Instrumentation</th>
      <th>Composer / Arranger</th>
      <th>Duration</th>
      <th>Price in € Cat. A</th>
      <th>Price in $ Cat. A</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(props.catalogue).map(catalogue=>{
      let _id = catalogue.link.slice(50,54)
        return (<tr onClick={()=> !isNaN(_id) === true ? loadProfile(_id):missingProfile()}>
            <td>{catalogue.catalogueNumber}</td>
            <td>{catalogue.title}</td>
            <td>{catalogue.instrumentation}</td>
            <td>{catalogue.composerArranger}</td>
            <td>{catalogue.duration}</td>
            <td>{catalogue.priceInEuros}</td>
            <td>{catalogue.priceInDollars}</td>
            </tr>)
    })}
  </tbody>
</Table>  
        </Col>
        </Row>
    </Container>
    </section> 
    </>)
}
function mapStateToProps(state) {
    return {
        catalogue:state.catalogueReducer,
        presentations:state.musicReducer.allPresentations
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
  )(RentalCatalogue);
