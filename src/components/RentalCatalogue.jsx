import React from "react";
import {Row,Col,Container} from "react-bootstrap"
const RentalCatalogue  = () => {
    return (<>
    <section className="RentalCatalogue">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>Rental Catalogue</h3>
            
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default RentalCatalogue