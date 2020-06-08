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
    //"biography",
    "catalogue","cds","contact","events","news",
    //"misc",
    //"order",
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
            return <li key={link} className={active ===  link ? "active-nav-item":"nav-item"} onClick={()=>setActive(link)}><Link to={`/dashboard/${link}`} ><List  style={{marginRight:"5px"}} />{link}</Link></li>
        })
    }
    return (
        <Container>
            <Row>
                <ul className="sidebar">
                    <NavList />
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
