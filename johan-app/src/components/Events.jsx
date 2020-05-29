import React,{useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Row,Col,Container} from "react-bootstrap"
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions"
import ReactHtmlParser from 'react-html-parser'; 
const Events  = (props) => {
	useEffect(() => {
        window.scrollTo(0,0)
	   document.title = "JohanDeMeij.com | Events"
	   props.actions.mainAction(ACTIONS.LOAD_EVENT,53)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
    <section className="events">
    
    <Container>
         <Row>
         <Col lg={{span:12}} style={{color:'#000',textAlign:"center"}}>
         <h3 style={{color:'#000',textAlign:"center",marginTop:"50px"}}>{props.event.title}</h3>
	        {ReactHtmlParser(props.event.synopsis)}		  
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
function mapStateToProps(state) {
	return {
	  event: {...state.eventsReducer[0]}
	};
  }
  
  function mapDispatchToProps(dispatch) {
	return {
	  actions: bindActionCreators({mainAction}, dispatch)
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Events);
