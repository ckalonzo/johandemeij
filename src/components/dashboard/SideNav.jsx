import React from "react"
import {Link } from "react-router-dom"
import { Container,Row } from "react-bootstrap"

const Navbar = () => {
    return (
        <Container>
            <Row>
                <ul className="sidebar">
                    <li><Link to="/dashboard">news</Link></li>
                    <li><Link to="/">publications</Link></li>
                    <li><Link to="/">cds</Link></li>
                    <li><Link to="/">agenda</Link></li>
                    <li><Link to="/">biography</Link></li>
                    <li><Link to="/">catalogue</Link></li>
                    <li><Link to="/">order</Link></li>
                    <li><Link to="/">misc</Link></li>
                    <li><Link to="/">events</Link></li>
                    <li><Link to="/">submissions</Link></li>
                </ul>
            </Row>
        </Container>
    )
}
export default Navbar;