import React,{useEffect,useState} from "react"
import Navbar from 'react-bootstrap/Navbar'
import { Container,Nav,Col,Row} from "react-bootstrap"

const NavigationBar = (props) => {
    const [navLocation,setNavLocation]=useState("home")
    useEffect(() => {
        window.scrollTo(0,0)
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
    const NavList = () => {
        const navItems = ["home","events","agenda","music","biography","rental catalogue","order"];
       return  navItems.map(item => {
        return <li key={item}><a href={`/${item.replace(/\s/g, '')}`}>{item}</a></li>
    })}
    const renderHeader = () => {
        return (<>
            <div className="navigation"> 
                
                     <Row> <Container> 
                         <Col lg={{span:"12" }} className="headline">
                         The music of<br /> <span>Johan de Meij</span>
                         </Col>  </Container>
                     </Row>
                     <Row className="nav-row">
                     <Container> 
                         <Col lg={{span:"12" }}>
                             <ul>
                                 <NavList />
                             </ul>
                         </Col></Container>
                     </Row>
               
             </div>
           </>)
    }

    return renderHeader()
}
export default NavigationBar