import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions"

const Login = props => {
    const [validated, setValidated] = useState(null);


  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Login`;
  // props.actions.mainAction(ACTIONS.LOAD_POSTS,{})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logout = 
            (event) => {
                event.preventDefault();
                setValidated(true)
                localStorage.clear();
                props.actions.mainAction(ACTIONS.LOGOUT,{})
    };
    
  return (
    <>
    <Container className="dashboard">
        <Row>
          <Col lg={{span:"4",offset:"4"}}> 
        
            <section>
              <Form noValidate validated={validated} onSubmit={logout}>
                
            
                <Button type="submit">Logout</Button>
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
