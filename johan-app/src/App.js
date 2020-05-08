import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SiteRouter from "utils/siteRouter"
import 'bootstrap/dist/css/bootstrap.min.css';
import "css/main.css"
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer"


class App extends Component {
  componentDidMount(){
    //this.props.actions.mainAction(ACTIONS.LOAD_USER_FROM_LOCAL_STORAGE,{})
  }
  render() {
  return (
    <>
    <Navbar  />
    <SiteRouter />
    <Footer />
    </>
  )
  }
}

function mapStateToProps(state) {
  return {
   
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
       
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);