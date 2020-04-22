import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import { Container,Nav,Col,Row} from "react-bootstrap"

const NavigationBar = (props) => {

    const NavList = () => {
        const navItems = ["home","events","agenda","music","biography","rental catalogue","order"];
       return  navItems.map(item => {
        return <li key={item}><a href={`/${item.replace(/\s/g, '')}`}>{item}</a></li>
    })}

    return (<>
       <div className="navigation"> 
            <Container> 
                <Row>
                    <Col lg={{span:"12" }} className="headline">
                    The music of<br /> <span>Johan De Meij</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span:"12" }}>
                        <ul>
                            <NavList />
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
      </>)
}
export default NavigationBar