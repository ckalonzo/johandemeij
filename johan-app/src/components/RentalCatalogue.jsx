import React,{ useEffect , useState} from "react";
import {Table,Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
import { render } from "@testing-library/react";

const RentalCatalogue  = (props) => {
  //const [selectedPresentation,setSelectedPresentation]= useState()
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music"
       props.actions.mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE,{})
       props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       props.actions.mainAction("GET_MISC_ITEMS",{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadProfile = (id) =>{
      props.history.push('/music/profile/'+id)
  }
  const renderComposerLink = (composer) =>{
  
    return  ReactHtmlParser(composer.toLowerCase().replace(/johan de meij|johan de  meij/g,"<a href='/biography'>Johan de Meij</a>"))
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
    {props.catalogue ? Object.values(props.catalogue).map(catalogue=>{
        return (<tr>
            <td className="catalogue-number" onClick={()=>loadProfile(catalogue.link)}>{catalogue.catalogueNumber}</td>
            <td className="catalogue-title" onClick={()=>loadProfile(catalogue.link)}>{catalogue.title}</td>
            <td className="catalogue-instrumentation" >{catalogue.instrumentation}</td>
            <td className="catalogue-composer" >{renderComposerLink(catalogue.composerArranger)}</td>
            <td className="catalogue-duration" >{catalogue.duration}</td>
            <td className="catalogue-euros" >{catalogue.priceInEuros}</td>
            <td className="catalogue-dollars" >{catalogue.priceInDollars}</td>
            </tr>)
    }) :"Loading..."}
  </tbody>
</Table>  
        </Col>
        </Row>
        <Row>
  <Col>{ReactHtmlParser(props.miscItems.main_text)}</Col>
        </Row>
    </Container>
    </section> 
    </>)
}
function mapStateToProps(state) {
    return {
        catalogue:state.catalogueReducer,
        presentations:state.musicReducer.allPresentations,
        miscItems:state.miscItemsReducer
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
