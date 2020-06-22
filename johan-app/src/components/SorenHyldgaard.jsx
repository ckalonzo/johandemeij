import React,{ useEffect,useState } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
const SorenHyldgaard = (props) => {
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Søren Hyldgaard"
        props.actions.mainAction(ACTIONS.LOAD_PAGE,"waPG0PdWkY6GFPHglIKN")
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
    <section className="soren">
        <Container>
            <Row>
                <Col lg={{span:3}}>
                    <div>
                        <img src={`/images/sh6.jpeg`} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 10%",marginBottom:"25px"}} alt="biogrophy"/>
                    </div>
                    <div>
                        <img src={`/images/sh8.jpeg`} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 10%"}} alt="biogrophy"/>
                    </div>
                </Col>
                <Col  lg={{span:9}}>
                {ReactHtmlParser(props.sorenPage.content)}
                </Col>
            </Row>
        </Container>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        sorenPage:state.pageReducer
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
  )(SorenHyldgaard);
