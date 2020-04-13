import React from "react";
import {Row} from "react-bootstrap"
import AgendaCard from "components/shared/AgendaCard"
import { Link } from "react-router-dom"
const Agenda  = () => {
    return (<>
    <section className="agenda">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
         <Row>
         <AgendaCard />
         <AgendaCard />
         <AgendaCard />
         <AgendaCard />
        </Row>
    </div>
    <h3 style={{textAlign:'center',fontSize:"1rem",textTransform: "uppercase",color:"#FFF"}}><Link to="/">view full agenda</Link></h3>
    </section>
    </>)
}
export default Agenda