import React,{useState,useEffect} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions"
import {Link } from "react-router-dom"
import { Container,Row,Button } from "react-bootstrap"
import { List } from 'react-bootstrap-icons';
const Navbar = (props) => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const navLinks = [
    "agenda",
    "biography",
    "catalogue","cds","contact","events",
    "misc",
    "news",
    "order",
    "publications",
    "submissions"
    ]
   
    const [active,setActive] = useState("news")
    const logout = () =>{
        props.actions.mainAction(ACTIONS.LOGOUT,[])
        localStorage.removeItem('user');
    }
    const NavList = () => {
        return navLinks.map(link=>{
            return <li key={link} className={active ===  link ? "active-nav-item":"nav-item"} onClick={()=>setActive(link)}><Link to={`/dashboard/agenda`} ><List  style={{marginRight:"5px"}} />agenda</Link></li>
        })
    }
    return (
        <Container>
            <Row>
                <ul className="sidebar">
                   
    <li  className={active ===  "agenda" ? "active-nav-item":"nav-item"} onClick={()=>setActive("agenda")}><Link to={`/dashboard/agenda`} ><List  style={{marginRight:"5px"}} />{"agenda"}</Link></li>
    <li  className={active ===  "biography" ? "active-nav-item":"nav-item"} onClick={()=>setActive("biography")}><Link to={`/dashboard/biography/ccABrrzbrMWBgkVJx7oZ`} ><List  style={{marginRight:"5px"}} />{"biography"}</Link></li>
    <li  className={active ===  "catalogue" ? "active-nav-item":"nav-item"} onClick={()=>setActive("catalogue")}><Link to={`/dashboard/catalogue`} ><List  style={{marginRight:"5px"}} />{"catalogue"}</Link></li>
    <li  className={active ===  "cds" ? "active-nav-item":"nav-item"} onClick={()=>setActive("cds")}><Link to={`/dashboard/cds`} ><List  style={{marginRight:"5px"}} />{"cds"}</Link></li>
    <li  className={active ===  "contact" ? "active-nav-item":"nav-item"} onClick={()=>setActive("contact")}><Link to={`/dashboard/contact`} ><List  style={{marginRight:"5px"}} />{"contact"}</Link></li>
    <li  className={active ===  "events" ? "active-nav-item":"nav-item"} onClick={()=>setActive("events")}><Link to={`/dashboard/events`} ><List  style={{marginRight:"5px"}} />{"events"}</Link></li>
    <li  className={active ===  "misc" ? "active-nav-item":"nav-item"} onClick={()=>setActive("misc")}><Link to={`/dashboard/soren/waPG0PdWkY6GFPHglIKN`} ><List  style={{marginRight:"5px"}} />{"misc"}</Link></li>
    <li  className={active ===  "news" ? "active-nav-item":"nav-item"} onClick={()=>setActive("news")}><Link to={`/dashboard/news`} ><List  style={{marginRight:"5px"}} />{"news"}</Link></li>
    <li  className={active ===  "order" ? "active-nav-item":"nav-item"} onClick={()=>setActive("order")}><Link to={`/dashboard/order`} ><List  style={{marginRight:"5px"}} />{"order"}</Link></li>
    <li  className={active ===  "publications" ? "active-nav-item":"nav-item"} onClick={()=>setActive("publications")}><Link to={`/dashboard/publications`} ><List  style={{marginRight:"5px"}} />{"publications"}</Link></li>
    <li  className={active ===  "submissions" ? "active-nav-item":"nav-item"} onClick={()=>setActive("submissions")}><Link to={`/dashboard/submissions`} ><List  style={{marginRight:"5px"}} />{"submissions"}</Link></li>
    <li onClick={()=>logout()} className="logout"><Button variant="secondary" size="sm" >Logout</Button></li>
   
                </ul>  
            </Row>
        </Container>
    )
}
function mapStateToProps(state) {
    
    return {
      user:state.userReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
