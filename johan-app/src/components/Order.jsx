import React,{ useEffect } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import Location from "components/shared/Location"
const Order  = (props) => {
  useEffect(() => {
    window.scrollTo(0,0)
    document.title = "JohanDeMeij.com | Music"
   props.actions.mainAction(ACTIONS.LOAD_ORDER_LOCATIONS,{})
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
    return (<>
    <section className="order">
    
    <Container>
         <Row>
         <Col >
         <h5 style={{marginTop:"50px",fontSize: "1.5rem", textTransform: "uppercase", color: "rgb(0, 0, 0)", textAlign:"center"}}>ORDER AMSTEL MUSIC PRODUCTS</h5>
             <p>For your convenience, here is the complete list of all exclusive distributors for the Amstel Music Catalogue per territory.</p>
            
        </Col>
        </Row>
        <Row>
          {Object.values(props.catalogue).map(location => {
            return  <Col lg={{span:6}}><Location {...location} /></Col>
          })}
        </Row>
    </Container>
    </section> 
    </>)
}
function mapStateToProps(state) {
    return {
        catalogue:state.orderReducer,
        
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
  )(Order);
