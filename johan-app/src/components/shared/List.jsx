import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import {Col, Row} from "react-bootstrap"
import {Link } from "react-router-dom"
import dayjs from "dayjs"
import ReactHtmlParser from 'react-html-parser';
const returnMonth = (month) => {
    month = (month -1);
   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return months[month]
}
const List = (props) => {
const Encode = (string) => { 
    var i = string.length, 
        a = []; 

    while (i--) { 
        var iC = string[i].charCodeAt(); 
        if (iC < 65 || iC > 127 || (iC > 90 && iC < 97)) { 
            a[i] = '&#' + iC + ';'; 
        } else { 
            a[i] = string[i]; 
        } 
    } 
    return a.join(''); 
} 
   const renderList = (props) => {
    return (<>
        <Row className="agenda-list">
        <Col md={{span:10}} lg={{span:11}} className="agenda-info">
    
        <div>
            <div className="orchestra">{props.orchestra}</div>
{props.conductor ?ReactHtmlParser(`<div class="conductor">Conductor: ${props.conductor}</div>`):''}
{props.title  ? <div className="title"><Link to={"/music/profile/"+props.cd}>{props.title}</Link></div>:""}
{props.title1 ? <div className="title"><Link to={"/music/profile/"+props.cd1}>{props.title1}</Link></div>:""}
{props.title2 ? <div className="title"><Link to={"/music/profile/"+props.cd2}>{props.title2}</Link></div>:""}
{props.title3 ? <div className="title"><Link to={"/music/profile/"+props.cd3}>{props.title3}</Link></div>:""}
<div className="time">{`${returnMonth(props.month)} ${props.day} ${props.year} ${props.time}`}</div>
            <div className="venue">{`${props.location}`}</div>
            <div className="location">{`${props.city} ${props.country}`}</div>
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
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(List);