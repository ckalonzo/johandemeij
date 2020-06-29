import React,{useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container,Row,Col} from "react-bootstrap"
import { mainAction } from "redux/actions/index.actions"
import SideNav from "components/dashboard/SideNav"
import Login from "components/dashboard/Login"


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
            { Object.values(props.user).length > 0 ? <SideNav />:"" }
               
            </Col>
            <Col lg={{span:9}}>
             { Object.values(props.user).length > 0 ? "":<Login />}
             
            </Col>
        </Row>
    </Container>
    </>)
}
function mapStateToProps(state) {
    return {
      user:state.userReducer
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