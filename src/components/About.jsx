import React from "react";
import {Row,Col,Button,Container} from "react-bootstrap"
const About  = () => {
    return (<>
    <section className="about">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>About</h3>
             <p>Johan de Meij (Voorburg, 1953) studied trombone and conducting at the Royal Conservatory of Music in The Hague. He has earned international fame as a composer and arranger. His catalogue consists of original compositions, symphonic transcriptions and arrangements of film scores and musicals.</p>
             <Button variant="danger">Read more</Button>
        </Col>
         <Col  lg={{span:4,offset:1}} className="bio-photo">

         </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default About