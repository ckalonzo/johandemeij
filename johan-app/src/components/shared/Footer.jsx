import React, { useEffect, useState } from "react";
import { Nav,Col,Row,Container,Form,Button} from "react-bootstrap"
const Footer = () => {
    const [orchestraEnsemble, setOrchestraEnsemble] = useState();
    const [conductor, setConductor] = useState();
    const [nameOfPiece, setNameOfPiece] = useState();
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        // Update the document title using the browser API
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const FooterList = () => {
        let navItems = ["news","events","agenda","music","biography","rental catalogue","order"]
       return  navItems.map(item => {
        return <li key={item}><Nav.Link  href={`/${item.replace(/\s/g, '')}`} style={{textTransform:"capitalize"}}>{item}</Nav.Link></li>
    })}
    const handleSubmit = event => {
        event.preventDefault();
        
        let concertItem = {
            orchestraEnsemble,
            conductor,
            nameOfPiece
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        setValidated(true);
        
      };
    
    const date = new Date();
    const Year = date.getFullYear()
    return (<>
        
<footer>
    <Container>
    <Row>
    <Col md={4}>

<h5 className="text-uppercase">Send us your concert information:</h5>
<Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Row>
                  <Form.Group as={Col}  controlId="title">
                    <Form.Control
                    size="sm" 
                      required
                      type="text"
                      placeholder="Orchestra, Ensemble:"
                      defaultValue={orchestraEnsemble}
                      onChange={e => setOrchestraEnsemble(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="date">
                    <Form.Control 
                        size="sm" 
                      required
                      type="text"
                      placeholder="Conductor"
                      defaultValue={conductor}
                      onChange={e => setConductor(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product description.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="date">
                    <Form.Control
                    size="sm" 
                      required
                      type="text"
                      placeholder="Name of Piece:"
                      defaultValue={nameOfPiece}
                      onChange={e => setNameOfPiece(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product description.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="date">
                    <Form.Control
                    size="sm" 
                      required
                      type="text"
                      placeholder="Date, Time, Location:"
                      defaultValue={""}
                      onChange={e => setConductor(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product description.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  
                </Form.Row>

                <Button className="jdm-button" type="submit">Send</Button>
              </Form> 

</Col>
<Col md={{span:3,offset:1}}>
<h5 className="text-uppercase">Links</h5>
    <ul><FooterList /></ul>
</Col>
<Col md={4} className="social-media">
<h5 className="text-uppercase">Social Media</h5>
<ul>
    <li><a href="http://www.facebook.com/johan.demeij?sk=wall" className="fa fa-facebook">&nbsp;</a>
</li>
<li><a href="http://twitter.com/JohandeMeij?utm_campaign=newfollow20100823&utm_content=profile&utm_medium=email&utm_source=follow" className="fa fa-twitter">&nbsp;</a></li>
<li><a href="http://twitter.com/JohandeMeij?utm_campaign=newfollow20100823&utm_content=profile&utm_medium=email&utm_source=follow" className="fa fa-linkedin">&nbsp;</a></li>
</ul>
</Col>
    </Row>
    </Container>
    <Row>
        <Col>
        <div className="footer-copyright text-center py-3">{`© ${Year} Copyright johandemeij.com`}</div>
        </Col>
    </Row>
</footer>

      </>)
}
export default Footer