import React from "react";
import {Row,Col,Container} from "react-bootstrap"
const Order  = () => {
    return (<>
    <section className="Order">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>Order</h3>
            
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default Order