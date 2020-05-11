import React, {useEffect} from "react";
import {Row} from "react-bootstrap"
import List from "components/shared/List"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
const Agenda  = (props) => {
    useEffect(() => {
       props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:10,skip:0})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (<>
    {/* <section className="agenda">
    <h3 style={{textAlign:'center',fontSize:"2rem"}}>Agenda</h3>
    <div className="container">
         
        {Object.values(props.agendas).map((agenda,i)=> {
          if(i<=5)
            return <List key={i} {...agenda}/>
        })}
        
    </div>
    <h3 style={{textAlign:'center',fontSize:"1rem",textTransform: "capitalize"}}><Link to="/agenda">view full agenda</Link></h3>
    </section> */}
    <section class="agenda-full"><h3 style={{textAlign: "center",margin:"50px 0",fontSize: "2rem",textTransform: "uppercase",color: "rgb(255, 255, 255)"}}>Agenda</h3><div class="container"><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Salem Symphonic Winds</div><div class="time">3:00 pm</div><div class="location">USA  Salem, Oregon - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">17</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Die Norddeutsche BlÃ¤serphilharmonie </div><div class="time">5:30 pm</div><div class="location">Germany  Itzehoe - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">29</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Wind Ensemble GAJA </div><div class="time">6:45 pm</div><div class="location">Japan  Aichi -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">25</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Himeji City Wind Orchestra </div><div class="time">2:00 pm</div><div class="location">Japan  Hyogo -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">10</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Gustav Holst Wind Symphony </div><div class="time">9:00 pm</div><div class="location">Italy  Modica, Sicily - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">23</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Siena Wind Orchestra</div><div class="time">4:30 pm</div><div class="location">Japan  Tokyo -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">03</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Amicitia Landsmeer</div><div class="time">2:00 pm</div><div class="location">The Netherlands  Amsterdam -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">16</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Banda y Coro del Conservatorio Profesional de Salamanca</div><div class="time">8:00 pm</div><div class="location">Spain  Salamanca - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">13</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Wind Orchestra NAGOYA 2020</div><div class="time">3:00 pm</div><div class="location">Japan  Nagoya -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">05</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Kyushu Wind Orchestra</div><div class="time">2:00 pm</div><div class="location">Japan  Fukuoka, Kyushu - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">10</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Kyushu Wind Orchestra</div><div class="time">3:00 pm</div><div class="location">Japan  Fukuoka, Kyushu -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">10</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">SANTA BARBARA CITY COLLEGE CONCERT BAND &amp; CONCERT CHOIR</div><div class="time">7:00 pm</div><div class="location">USA  Santa Barbara - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">02</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">SANTA BARBARA CITY COLLEGE CONCERT BAND &amp; CONCERT CHOIR</div><div class="time">3:00 pm</div><div class="location">USA  Santa Barbara -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">03</div><div class="month">May</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Stadtmusik St. Gallen</div><div class="time">7:30 pm</div><div class="location">Switzerland  St. Gallen -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">13</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Stadtmusik St. Gallen</div><div class="time">5:00 pm</div><div class="location">Switzerland  Bischofszell -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">21</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Akikazu Toita trombone, Makiko Miura piano</div><div class="time">2:00 pm</div><div class="location">Japan  Osaka - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">24</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Chesapeake Bay Wind Ensemble</div><div class="time">8:00 pm</div><div class="location">USA  Newport News, Virginia -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">06</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Bue Ciel Symphonic Winds</div><div class="time">2:00 pm</div><div class="location">Japan  Osaka -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">14</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Wind Orchestra Kazenowa </div><div class="time">2:00 pm</div><div class="location">Japan  Tokyo -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">14</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Akikazu Toita trombone, Makiko Miura piano</div><div class="time">7:00 pm</div><div class="location">Japan  Osaka -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">24</div><div class="month">June</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Allentown Band</div><div class="time">7:30 pm</div><div class="location">USA  Allentown, PA</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">02</div><div class="month">July</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">Osaka Concert Brass </div><div class="time">7:00 pm</div><div class="location">Japan  Osaka -</div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">03</div><div class="month">July</div><div class="year">2020</div></div></div></div><div class="agenda-list row"><div class="agenda-info col-lg-11 col-md-10"><div><div class="title">LBM Jeugdorkest</div><div class="time">8:00 pm</div><div class="location">The Netherlands  Landgraaf - </div></div></div><div class="date col-lg-1 col-md-2"><div><div class="day">04</div><div class="month">July</div><div class="year">2020</div></div></div></div></div></section>
    </>)
}
function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer
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
  )(Agenda);
