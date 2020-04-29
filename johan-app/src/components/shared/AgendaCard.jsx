import React from "react"
import {Col} from "react-bootstrap"
import {Link } from "react-router-dom"
import dayjs from "dayjs"
const AgendaCard = (props) => {
   // console.log(props)
    return (<>
    <Col lg={{span:props.display ? props.display:"3" }}>
    <div className="agenda-card">
        <div className="card-body">
    <div className="title">{props.orchestra}</div>
            <div className="conductor">Conductor: <span>{`${props.conductor}`}</span></div>
            <div className="cd-title"><Link to="/">Dutch Masters Suite</Link></div>
            <div className="date">{`${dayjs(props.month).format('MMMM')} ${props.day},  ${props.year}`}  <br />{props.time}</div>
    <div className="location">{`${props.country}  ${props.city}`}</div>
        </div>
        </div>
    </Col>
    </>)
}
export default AgendaCard