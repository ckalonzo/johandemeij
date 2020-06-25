import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import {Col, Row} from "react-bootstrap"
import {Link } from "react-router-dom"
import ReactHtmlParser from 'react-html-parser';
import CleanUpText from "utils/helperFunctions"
const returnMonth = (month) => {
    month = (month -1);
   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return months[month]
}
const List = (props) => {
    
   const renderList = (props) => {
    return (<>
        <Row id={props.id} className="agenda-list">
        <Col md={{span:10}} lg={{span:11}} className="agenda-info">
        <div>
            <div className="orchestra">{ReactHtmlParser(CleanUpText(props.orchestra))}</div>
{props.conductor ? ReactHtmlParser(`<div class="conductor">Conductor: ${CleanUpText(props.conductor)}</div>`):''}
{props.title  ? <div className="title"><Link to={"/music/profile/"+props.cd}>{props.title}</Link></div>:""}
{props.title1 ? <div className="title"><Link to={"/music/profile/"+props.cd1}>{props.title1}</Link></div>:""}
{props.title2 ? <div className="title"><Link to={"/music/profile/"+props.cd2}>{props.title2}</Link></div>:""}
{props.title3 ? <div className="title"><Link to={"/music/profile/"+props.cd3}>{props.title3}</Link></div>:""}
<div className="time">{`${returnMonth(props.month)} ${props.day} ${props.year} ${props.time}`}</div>
            <div className="venue">{`${CleanUpText(props.location)}`}</div>
            <div className="location">{`${CleanUpText(props.city)} ${CleanUpText    (props.country)}`}</div>
            <div className="orchestra">{ReactHtmlParser(CleanUpText(props.synopsis))}</div>
        </div>
        </Col>
        <Col md={{span:2}} lg={{span:1}} className="date"  style={{position:"relative"}}>
            <div style={{width:"40%",position:"absolute",left:"25%",top:"25%"}}>
                <div className="day">{`${props.day}`}</div>
                <div className="month">{`${returnMonth(props.month)}`}</div>
                <div className="year">{`${props.year}`}</div>
            </div>
        </Col>
        </Row>
        </>)
   }
   return props.orchestra ? renderList(props):null
}
function mapStateToProps(state) {
    return {
        presentations:state.musicReducer.allPresentations
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
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(List);