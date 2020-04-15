import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import { Nav,Col,Row} from "react-bootstrap"

const NavigationBar = (props) => {

    const NavList = () => {
        const navItems = ["home","events","agenda","music","biography","rental catalogue","order"];
       return  navItems.map(item => {
        return <Nav.Link key={item} href={`/${item.replace(/\s/g, '')}`}>{item}</Nav.Link>
    })}

    return (<>
        <Navbar bg="dark" variant="dark">
            <div className="container">
                
                <Row>
                    <Col lg={{span:"3"}}>
                        <Navbar.Brand href="/">JDM |</Navbar.Brand>

                    </Col>
                    <Col lg={{span:"9" }}>
                        <Nav className="mr-auto">
                            <NavList />
                        </Nav>
                    </Col>
                </Row>
            </div>
        </Navbar>
      </>)
}
export default NavigationBar