import React, { useEffect, useState } from "react";
import { Nav,Col,Row,Container,Form,Button} from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs"
const Footer = (props) => {
  const [contactName,setContactName] = useState()
  const [contactEmail,setContactEmail] = useState()
  const [contactSubject,setContactSubject] = useState()
  const [contactMessage,setContactMessage] = useState()
  const [validation,setValidation] = useState()
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    let d = new Date()
    let message = {
      id:dayjs(d).format('YYYYMMDDHHmmss'),
      contactName,
      contactEmail,
      contactSubject,
      contactMessage,
      date:dayjs(d).format('MM-DD-YYYY'),
      time:dayjs(d).format('HH:mm:ss A')
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
 if(validation === "7"){    
setValidated(true);
  props.actions.mainAction(ACTIONS.SUBMIT_CONTACT_INFO,message)
   console.log(message)
   setTimeout(()=>{ 
     window.location.reload()
    }, 1);}
  };
    useEffect(() => {
        // Update the document title using the browser API
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const FooterList = () => {
        let navItems = ["news","events","agenda","music","biography","rental catalogue","order"]
       return  navItems.map(item => {
        return <li key={item}><Nav.Link  href={`/${item.replace(/\s/g, '')}`} style={{textTransform:"capitalize"}}>{item}</Nav.Link></li>
    })}
   
    const renderContactForm = () => {
      return (<>
       <h3>Contact</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
                  <Form.Group as={Col}  controlId="name">
                  <Form.Control type="text" placeholder="Name" onChange={(e)=> setContactName(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="email">
                  <Form.Control type="email" placeholder="Email"  onChange={(e)=> setContactEmail(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
          </Form.Row>
          <Form.Row>
                  <Form.Group as={Col}  controlId="subject">
                  <Form.Control type="text" placeholder="subject"  onChange={(e)=> setContactSubject(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
          <Form.Row>
                  <Form.Group as={Col}  controlId="message">
                  <Form.Control as="textarea" rows="3" placeholder="message"  onChange={(e)=> setContactMessage(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
                  <Form.Row>
                  
                  <Form.Label>Please add these numbers 3 + 4</Form.Label>
                  <Form.Group as={Col}  controlId="subject">
                  <Form.Control type="text" placeholder="" size="sm" onChange={(e)=> setValidation(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid answer.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
          <Form.Row>
                  <Form.Group as={Col}  controlId="message">
                      <Button variant="dark"  type="submit">Submit</Button>
                  </Form.Group>
                  </Form.Row>
                  </Form>
      </>)
    }
   
    const date = new Date();
    const Year = date.getFullYear()
    const renderSubmitted = () => {
      return (<h3>Contact submitted!</h3>)
    }
    return (<>
     
<footer >
      <Container className="footer-copyright">
    <Row>
      <Col   md={{span:4}} style={{marginTop: "50px"}}>
      <h3>Categories</h3>
      <ul><FooterList /></ul>
      </Col>
      <Col   md={{span:4}} style={{marginTop: "50px"}}>
      <h3>Social networks</h3>
        <a href="http://www.facebook.com/johan.demeij?sk=wall" target="_blank" className="fa fa-facebook">&nbsp;</a>
<a href="http://twitter.com/JohandeMeij?utm_campaign=newfollow20100823&utm_content=profile&utm_medium=email&utm_source=follow" target="_blank" className="fa fa-twitter">&nbsp;</a><a href="http://www.linkedin.com/pub/johan-de-meij/3/667/399" target="_blank" className="fa fa-linkedin">&nbsp;</a></Col>
      <Col style={{marginTop: "50px"}}>
       {!validated ? renderContactForm(): renderSubmitted()}
      </Col>
    </Row>
    <Row className="bottom-row">
    
     <Col style={{alignSelf: "center"}}  md={{span:12}} className="text-center py-3">
        <div className="copyright-text">{`© ${Year} johandemeij.com. All rights reserved`}</div>
        </Col> 
    </Row> </Container>
</footer>

      </>)
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);