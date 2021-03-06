import React,{useEffect} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container,Col,Row} from "react-bootstrap"
import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
const NavigationBar = (props) => {
    
    useEffect(() => {
        window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS. LOAD_HEADER,props.history.location.pathname.replace('/', ''))
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
    
    const navItems = ["home","events","agenda","gallery", "music","biography","rental catalogue","order"];
    const NavList = () => {
        
       return  navItems.map(item => {
        return <li key={item} className={item}><a href={`/${item.replace(/\s/g, '')}`}>{item}</a></li>
    })}

    const handleClick = (location) => {
        props.actions.mainAction(ACTIONS. LOAD_HEADER,{location})
        props.history.push('/'+location)
    }
   // console.log(props)
    const renderHeader = () => {
      
        return (<>
            <header className={navItems.includes(props.header.name) || navItems.includes("rental catalogue")? props.header.name : "music" +" navigation"}> 
                
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
               
             </header>
           </>)
    }

    return renderHeader()
}
function mapStateToProps(state) {
    return {
        header:state.headerReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
            mainAction
        },
        dispatch
      )
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavigationBar)