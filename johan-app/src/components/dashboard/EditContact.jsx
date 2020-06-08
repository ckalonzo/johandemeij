import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditContact = props => {
 
  const [title, setFieldTitle] = useState();
  const [content, setContent] = useState(props.event ? props.event.synopsis:'');
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Contact`;
    console.log(props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_CONTACT,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {

  };
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
  <li><span style={{fontWeight:"bold"}}>Name:</span> {props.contact ? props.contact.contactEmail:""}</li>
  <li><span style={{fontWeight:"bold"}}>Subjet:</span> {props.contact ? props.contact.contactMessage:""}</li>
  <li><span style={{fontWeight:"bold"}}>Email:</span> {props.contact ? props.contact.contactName:""}</li>
  <li><span style={{fontWeight:"bold"}}>Message:</span> {props.contact ? props.contact.contactSubject:""}</li>
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
    contact:state.contactUsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
