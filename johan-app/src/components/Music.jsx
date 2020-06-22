import React,{ useEffect,useState } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
import SorenHyldgaard from "components/SorenHyldgaard"
import Cds from "components/Cds"
const Music  = (props) => {
    const [categoryID,setCategoryID] = useState(7);
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music"
       props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadCategory = (id) => {
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_BY_CATEGORY,id)
        setCategoryID(id)
    }
    const loadProfile = (id,profile) =>{
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE,profile)
        props.history.push('/music/profile/'+id)
    }
    
    return (<>
    <section className="music">
    <Container>
         <Row>
         <Col>
             <h3 style={{fontSize:"1.5rem",textTransform: "uppercase",color:"#000",textAlign:"center"}}>Music</h3>
            <ul className="categories">
                {props.categories.map((category,i) => {
                    return <li key={i} className={category.id === categoryID ? "active":""} onClick={()=>loadCategory(category.id)}>{ReactHtmlParser(category.name)}</li>
                })}
            </ul>
        </Col>
        </Row>
        {categoryID === 0 ?   window.location.reload(): ""}
        {categoryID === 5 ? <SorenHyldgaard /> : ""}
        {categoryID === 9 ? <Cds {...props} /> : ""}
        <Row>
            <Col lg={{span:6}}>
            <ul>
                {props.allPresentations.map((presentation ,i)=>{
                    if(i <= 77 && presentation.cdName.indexOf("{{") === -1)
                    return <li key={i}><span onClick={()=>loadProfile(presentation.id,presentation)}>{ReactHtmlParser(presentation.cdName)}</span></li>
                    return null
                })}
            </ul>
            </Col>
            <Col lg={{span:6}}>
            <ul>
                {props.allPresentations.map((presentation,i)=>{
                    if(i > 77 && presentation.cdName.indexOf("{{") === -1)
                    return <li  key={i}><span onClick={()=>loadProfile(presentation.id,presentation)}>{ReactHtmlParser(presentation.cdName)}</span></li>
                    return null
                })}
            </ul>
            </Col>
        </Row>
    </Container>
    </section> 
    
    </>)
}
function mapStateToProps(state) {
    return {
        categories:state.musicReducer.categories,
        allPresentations:state.musicReducer.allPresentations
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
  )(Music);
