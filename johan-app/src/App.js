import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SiteRouter from "utils/siteRouter"
import 'bootstrap/dist/css/bootstrap.min.css';
import "scss/main.scss"
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer"


const App = (props) => {
  useEffect(() => { 
    document.title = "The music of Johan de Meij | JohanDeMeij.com"
    console.log(props)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>
    {props.history.location.pathname.includes("dashboard") ? "" : <Navbar {...props} />}
    <SiteRouter />
    <Footer />
    </>
  )
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