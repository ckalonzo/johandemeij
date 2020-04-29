import React from "react"
//import {Link } from "react-router-dom"
import { Container} from "react-bootstrap"

const Navbar = () => {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<Container>
<a className="navbar-brand" href="/dashboard">JDM | Dashboard</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
</button>
</Container>
</nav>
    )
}
export default Navbar;