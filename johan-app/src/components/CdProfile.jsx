import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import {Row,Container,Col,Table} from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser';

const CdProfile= (props)=>{
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music Profile"
       // props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
        props.actions.mainAction(ACTIONS.LOAD_CD,props.match.params.id)
        props.actions.mainAction(ACTIONS.LOAD_CD_INFO,props.match.params.id)
        props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
        props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,{})
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
    <Row><div>
        <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F${image}?alt=media`} width="300" />
    </div>
        <div  style={{fontSize:".9rem",margin:"15px 0"}}>{caption}</div></Row>
    </>)
}

const renderCodes = (codes) =>{
    if(codes)
    return codes.toString().replace("<br>","")
}
const renderComposerLink = (composer) =>{
    return  ReactHtmlParser(composer.toLowerCase().replace(/johan de meij|johan de  meij/g,"<a href='/biography'>Johan de Meij</a>"))
  } 
const renderProfile = () => {
    return(<>
        <section className="music-profile" style={{marginTop:"50px"}}>
           <Container>
               <Row>
               <Col lg={{span:8}}>
        <h1>{props.profile.cd_name}</h1>
        <p>{ReactHtmlParser(props.profile.synopsis ? CleanUpSynopsis(props.profile.synopsis):"")}</p>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Title</th>
                <th>Grade</th>
                <th>Time</th>
                <th>Codes</th>
                <th>composer</th>
                <th>Additional Info</th>
                </tr>
            </thead>
            <tbody>
               {Object.values(props.tracks).map(track => {
                   if(track.title.length > 0)
                   return (<tr key={track.id}>
                       <td><a href={"/music/profile/"+track.track_title}>{track.title}</a></td>
                       <td>{track.grade[0]}</td>
                       <td>{ReactHtmlParser(track.duration)}</td>
                       <td>{renderCodes(track.codes)}</td>
                       <td >{renderComposerLink(track.composer)}</td>
                       <td>{ReactHtmlParser(track.addInfo)}</td>
                       </tr>)
                       return null
                   })
               }                 
            </tbody>
        </Table>
                   </Col>
                   <Col lg={{span:4}}>
                {props.profile.frontCover ? renderImage(props.profile.frontCover,props.profile.frontCaption):""}
                {props.profile.backCover ? renderImage(props.profile.backCover,props.profile.backCaption):""}
                       <Row>    
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
 return(<>
{ props.profile ? renderProfile():<div style={{margin:"100px",textAlign:"center"}}><Container>Loading...</Container></div>}
 </>)
}
function mapStateToProps(state) {
    return {
        profile:state.cdReducer,
        presentations:state.AllPresentationsReducer,
        tracks:state.cdInfoReducer
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