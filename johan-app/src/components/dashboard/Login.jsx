import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PostImage from "components/dashboard/PostImage"

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(null);
    const [user,setUser] = useState(localStorage.getItem("user"))
  
  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Login`;
   // if(user)
   //props.actions.mainAction(ACTIONS.LOGIN_CHECK,user ? user:localStorage.getItem("user"))
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signInWithEmailAndPasswordHandler = 
            (event) => {
                event.preventDefault();
               console.log({email, password})
                props.actions.mainAction(ACTIONS.LOGIN_USER,{email, password})
    };
    
  return (
    <>
    <Container className="dashboard">
        <Row>
          <Col lg={{span:"4",offset:"4"}}> 
        
            <section>
              <Form noValidate validated={validated} onSubmit={signInWithEmailAndPasswordHandler}>
                
                <Form.Row>
                  <Form.Group as={Col}  controlId="userEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="userEmail"
                      placeholder=""
                      defaultValue={email}
                      onChange={e => setEmail(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide an email.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="userPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="userPassword"
                      placeholder=""
                      defaultValue={password}
                      onChange={e => setPassword(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a password.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  
                </Form.Row>
                <Button type="submit">Login</Button>
              </Form> 
            </section>
          </Col>
        </Row> 
      </Container>
    </>
  );
};
function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
