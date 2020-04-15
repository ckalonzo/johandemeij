import React from "react";
import {Row,Col,Button,Container} from "react-bootstrap"
const About  = () => {
    let styles = {
        backgrounSize:"cover",
        maxHeight:"300px",
        width:"100%",
        backgroundPosition:"50% 10%",
        overflow:"hidden"
    }
    return (<>
    <section className="about">
    
    <Container>
         <Row>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase"}}>About</h3>
             <p>Johan de Meij (Voorburg, 1953) studied trombone and conducting at the Royal Conservatory of Music in The Hague. He has earned international fame as a composer and arranger. His catalogue consists of original compositions, symphonic transcriptions and arrangements of film scores and musicals.</p>
             <Button className="jdm-button">Read more</Button>
        </Col>
         <Col  lg={{span:5,offset:1}} className="bio-photo" style={styles}>
         <img src={`/images/albums/pic3_download.jpg`} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 10%"}} />
         
         </Col>
        </Row>
    </Container>
    </section>
    </>)
}
export default About