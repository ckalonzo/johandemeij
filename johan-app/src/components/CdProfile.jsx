import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import {Row,Container,Col} from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser';
import { loadfilteredAgendas } from "API/indexAPI";

const CdProfile= (props)=>{
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music Profile"
        props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE,props.match.params.id)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

const loadProfile = (profile) => {
    props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE,profile)
}
    
const CleanUpSynopsis = (text)  => {
    return text.replace(/(\r\n|\n|\r)/gm, "")
}
const renderImage = (image,caption) => {
    return (<>
    <Row><div style={{backgroundImage:`url(/images/posts/${image !== null ? image:""})`,backgroundSize:"cover",width:"100%",minHeight:"290px"}}></div>
        <div  style={{fontSize:".9rem",margin:"15px 0"}}>{caption}</div></Row>
    </>)
}


const renderProfile = () => {
    return(<>
        <section className="music-profile" style={{marginTop:"50px"}}>
           <Container>
               <Row>
               <Col lg={{span:8}}>
        <h1>{props.profile.cdName}</h1>
        <h3>{props.profile.subTitle}</h3>
        <h5>{`Composer: ${props.profile.subTitle}`}</h5>
        <p>{ReactHtmlParser(props.profile.synopsis ? CleanUpSynopsis(props.profile.synopsis):"props.profile.synopsis")}</p>
                   </Col>
                   <Col lg={{span:4}}>
                        {props.profile.frontCover ? renderImage(props.profile.frontCover,props.profile.frontCaption):""}
                        {props.profile.backCover ? renderImage(props.profile.backCover,props.profile.backCaption):""}
                       <Row>
                           <div className="details">
                               <h2>Details</h2>
                               <ul>
    {props.profile.totalTime ?  <li><span>Order numbers:</span>  {ReactHtmlParser(props.profile.totalTime)}</li>:""}
    {props.profile.instrumentation ?  <li><span>Instrumentation:</span>  {ReactHtmlParser(props.profile.instrumentation)}</li>:""}
    {props.profile.duration ?  <li><span>Duration:</span>  {ReactHtmlParser(props.profile.duration)}</li>:""}
    {props.profile.cd ?  <li><span>Cd:</span>  {ReactHtmlParser(props.profile.cd)}</li>:""}
                               </ul>
                           </div>
                       </Row>
                       <Row>
                           <div className="video">
                               {ReactHtmlParser(props.profile.video)}
                           </div>
                       </Row>
                   </Col>
                   
               </Row>
           </Container>
        </section>
        </>)
}
console.log(props.profile)
 return(<>
{ props.profile ? renderProfile():<div style={{margin:"100px",textAlign:"center"}}><Container>Loading...</Container></div>}
 </>)
}
function mapStateToProps(state) {
    return {
        profile:state.CdProfileReducer,
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
  )(CdProfile);