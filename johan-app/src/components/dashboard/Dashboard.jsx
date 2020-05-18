import React,{useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container,Row,Col, Card } from "react-bootstrap"
import { mainAction } from "redux/actions/index.actions"
import SideNav from "components/dashboard/SideNav"
import Posts from "components/dashboard/Posts"
import { ACTIONS } from "redux/actions/types";

const Dashboard = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Johan De Meij | Dashboard`;
       // props.actions.mainAction(ACTIONS.LOAD_POST_IMAGE,{})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(<>
    <Container className="dashboard">
        <Row>
            <Col lg={{span:2}}>
               <SideNav />
            </Col>
            <Col lg={{span:9}}>
             
            </Col>
        </Row>
    </Container>
    </>)
}
function mapStateToProps(state) {
    return {
       
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
  )(Dashboard);