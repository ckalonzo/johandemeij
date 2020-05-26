import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import { Container,Col,Row,Form,Button} from "react-bootstrap"
const ContactUs = () => {
    return (<>
    <section className="contact-us">
        <Container>
            <Row>
                <Col>
                <h2>Contact us</h2>
                <Form.Row>
                  <Form.Group as={Col}  controlId="name">
                  <Form.Control type="text" placeholder="Name" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="email">
                  <Form.Control type="email" placeholder="Email" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="subject">
                  <Form.Control type="text" placeholder="subject" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="message">
                  <Form.Control as="textarea" rows="3" placeholder="message" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="message">
                      <Button>Submit</Button>
                  </Form.Group>
                  </Form.Row>
                </Col>
            </Row>
        </Container>
    </section>
   </>)
}


function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer
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
  )(ContactUs);