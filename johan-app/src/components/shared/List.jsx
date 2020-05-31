import React from "react"
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
   const renderList = (props) => {
    return (<>
        <Row className="agenda-list">
        <Col md={{span:10}} lg={{span:11}} className="agenda-info">
    
        <div>
            <div className="orchestra">{props.orchestra}</div>
            {props.conductor ?ReactHtmlParser(`<div class="conductor">Conductor: ${props.conductor}</div>`):''}
            <div className="title"><Link to={"/music/profile/"+props.cd}>{props.title}</Link></div>
            
            <div className="location">{`${returnMonth(props.month)} ${props.day} ${props.year} ${props.time}`} {`${props.city} ${props.country}`}</div>
        </div>
    
        </Col>
        <Col md={{span:2}} lg={{span:1}} className="date">
        <div >
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
export default List