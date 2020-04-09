import React from "react"
import {Link } from "react-router-dom"
import { Container,Row } from "react-bootstrap"

const Navbar = () => {
    const navLinks = ["news","publications","cds","agenda","biography","catalogue","order","misc","events","submissions"]
    const NavList = () => {
        return navLinks.map(link=>{
            return <li key={link}><Link to={`/dashboard/${link}`}>{link}</Link></li>
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