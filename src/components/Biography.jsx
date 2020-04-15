import React from "react";
import {Row,Col,Container} from "react-bootstrap"
const Biography  = () => {
    return (<>
    <section className="Biography">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>Biography</h3>
            
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default Biography