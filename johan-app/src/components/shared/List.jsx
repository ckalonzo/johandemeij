import React from "react"
import {Col, Row} from "react-bootstrap"
import {Link } from "react-router-dom"
import dayjs from "dayjs"
const List = (props) => {
   // console.log(props)
    return (<>
    <Row className="agenda-list">
    <Col md={{span:10}} lg={{span:11}} className="agenda-info">

    <div>
        <div className="title">{props.orchestra}</div>
        <div className="time">{props.time}</div>
        <div className="location">{`${props.country}  ${props.city}`}</div>
    </div>

    </Col>
    <Col md={{span:2}} lg={{span:1}} className="date">
    <div >
        <div className="day">{`${props.day}`}</div>
        <div className="month">{`${dayjs(props.month).format('MMMM')}`}</div>
        <div className="year">{`${props.year}`}</div>
        </div>
    </Col>
    </Row>
    </>)
}
export default List