import React from "react";
import {Row} from "react-bootstrap"
import AgendaCard from "components/shared/AgendaCard"
const AgendaList  = () => {
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
    </section>
    </>)
}
export default AgendaList