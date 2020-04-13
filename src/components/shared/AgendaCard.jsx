import React from "react"
import {Col} from "react-bootstrap"
import {Link } from "react-router-dom"
const AgendaCard = () => {

    return (<>
    <Col lg={{span:"3" }}>
    <div className="agenda-card">
        <div className="card-body">
            <div className="title">SYMPHONIC BAND MAJOVAK KARVINA</div>
            <div className="conductor">Conductor: <span>Ondrej Packan</span></div>
            <div className="cd-title"><Link to="/">Dutch Masters Suite</Link></div>
            <div className="date">APRIL 19, 2020  <br />4:00 PM</div>
            <div className="location">Karvina - Czech Republic</div>
        </div>
        </div>
    </Col>
    </>)
}
export default AgendaCard