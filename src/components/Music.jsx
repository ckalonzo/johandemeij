import React from "react";
import {Row,Col,Container} from "react-bootstrap"
const Music  = () => {
    return (<>
    <section className="Music">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>Music</h3>
            
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default Music