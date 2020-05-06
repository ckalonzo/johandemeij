import React,{useState} from "react"
import {Link } from "react-router-dom"
import { Container,Row } from "react-bootstrap"
import { List } from 'react-bootstrap-icons';
const Navbar = () => {
    const navLinks = ["news","publications","cds","agenda","biography","catalogue","order","misc","events","submissions"]
    const [active,setActive] = useState("news")
    const NavList = () => {
        return navLinks.map(link=>{
            return <li key={link} className={active ===  link ? "active-nav-item":"nav-item"} onClick={()=>setActive(link)}><Link to={`/dashboard/${link}`} ><List  style={{marginRight:"5px"}} />{link}</Link></li>
        })
    }
    return (
        <Container>
            <Row>
                <ul className="sidebar">
                    <NavList />
                </ul>  
            </Row>
        </Container>
    )
}
export default Navbar;