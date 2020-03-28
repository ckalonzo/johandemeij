import React,{useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container,Row,Col } from "react-bootstrap"
import { mainAction } from "redux/actions/index.actions"
import { ACTIONS } from "redux/actions/types"
import Navbar from "components/dashboard/Navbar"
import SideNav from "components/dashboard/SideNav"
import Posts from "components/dashboard/Posts"

const Dashboard = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Johan De Meij | Dashboard`;
        //if(props.categories.length === 0)
       
    },[])

    console.log(props)
    return(<>
    <Navbar />
    <Container id="dashboard">
        <Row>
            <Col lg={{span:2}}>
               <SideNav />
            </Col>
            <Col lg={{span:10}}>
              <Posts />
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