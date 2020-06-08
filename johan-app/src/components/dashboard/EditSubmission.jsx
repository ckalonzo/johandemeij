import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Submission = props => {
 
  const [title, setFieldTitle] = useState();
  const [content, setContent] = useState(props.event ? props.event.synopsis:'');
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_SUBMISSION,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container className="dashboard">
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
            <section id="product">
              <ul>
  <li><span style={{fontWeight:"bold"}}>Date:</span> {props.submission.dateTime}</li>
  <li><span style={{fontWeight:"bold"}}>Conductor:</span> {props.submission.conductor}</li>
  <li><span style={{fontWeight:"bold"}}>Location:</span> {props.submission.location}</li>
  <li><span style={{fontWeight:"bold"}}>Orchestra:</span> {props.submission.orchestraEnsemble}</li>
              </ul>
            </section>
          </Col>
        </Row> 
      </Container>
    </>
  );
};
function mapStateToProps(state) {
  return {
    submission:state.concertInformationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
