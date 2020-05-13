import React,{useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Row,Col,Container} from "react-bootstrap"
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions"
import ReactHtmlParser from 'react-html-parser'; 
const Events  = (props) => {
	useEffect(() => {
        window.scrollTo(0,0)
	   document.title = "JohanDeMeij.com | Events"
	   props.actions.mainAction(ACTIONS.LOAD_EVENT,53)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
    <section className="events">
    
    <Container>
         <Row>
         <Col lg={{span:12}} style={{color:'#000',textAlign:"center"}}>
         <h3 style={{color:'#000',textAlign:"center",marginTop:"50px"}}>{props.event.title}</h3>
	{ReactHtmlParser(props.event.synopsis)}		  
  {/* <div class="col-lg-12" style={{"color":"rgb(0, 0, 0)"," textAlign": "center"}}><h3 style={{color:'#000',textAlign:"center",marginTop:"50px"}}>Concerts &amp; Events 2020!</h3><p>Calefax &amp; Marinierskapel der Koninklijke Marine - conductor Arjan Tien<br />&nbsp;</p><p>'Un Momento Dado’ (written for reed quintet Calefax &amp; Marinierskapel) - world première<br />January 10 Concertzaal, Tilburg - The Netherlands&nbsp;<br />January 31 De Oosterpoort, Groningen - The Netherlands&nbsp;<br /><br />January 15-18<br />* Soli Brass Leeuwarden - Conductor: Johan de Meij<br />Ceremonial Fanfare<br />Sinfonietta No. 1 (for brass band)<br />* Noord Nederlands Jeugd Orkest - &nbsp;- Conductor: Erik Janssen, Levy Pletting, soprano<br />The Book of Urizen - Jacob de Haan<br />-.-.-.-. Intermission -.-.-.-.-<br />&nbsp;* Noord Nederlands Orkest (NNO) - Conductor: Johan de Meij<br />Symphony no. 2 The Big Apple (Orchestral Version)<br />&nbsp;January 18, 2020 - 8:15 pm Stadsschouwburg De Harmonie , Leeuwarden - The Netherlands<br />&nbsp;<br />January 22-25<br />United States Navy Band - Washington - Conductor: Johan de Meij, Tormod Flaten, euphonium soloist<br />Magic Garden (from The Venetian Collection)<br />UFO Concerto (euphonium &amp; wind orchestra)<br />American Suite - Antonin Dvorak<br />Dance of the Elves - David Popper<br />January 25, 2020 - 5:00 pm Weinberg Center, Frederick, Maryland - USA<br /><br />Barclay Brass - Conductor: Johan de Meij<br />&nbsp;Fanfare pour précéder La Péri - Paul Dukas<br />Nimrod – Edward Elgar /Arr. David Miller<br />Sinfonietta No. 1&nbsp;<br />Song (in memoriam Bengt Eklund) - Frode Rydland<br />Euphonium soloist: Tormod Flaten<br />William Tell Overture (Finale) - Gioachino Rossini<br />&nbsp;-.-.-.-.- intermission -.-.-.-.-.<br />Gandalf (part I from The Lord of the Rings)&nbsp;<br />Journey in the Dark (part IV from The Lord of the Rings)&nbsp;<br />Hobbits (part V from The Lord of the Rings)&nbsp;<br />October – Eric Whitacre/Arr. David Miller&nbsp;<br />Duet from Don Carlo (two euphoniums, symphonic brass &amp; percussion) - Giuseppe Verdi<br />&nbsp;Euphonium soloists: Tormod Flaten &amp; Johan de Meij</p><p><br />January 26, 2020 - 4:00 pm George Mason University, The Harris Theater, Fairfax, Virginia - USA<br /><br />Düsseldorfer Symphoniker&nbsp;- Conductor: Jesko Sirvend<br />Symphony no. 3 Planet Earth (Orchestral Version)&nbsp;(with Movie)</p><p><br />February&nbsp;07,&nbsp;2020 - 6:00 pm&nbsp;Tonhalle - Mendelssohn-Saal, Düsseldorf -&nbsp;Germany<br />\r\n https://www.tonhalle.de/reihen/reihe/Junge-Tonhalle1/The-Sound-of-Future-Trilogie-II/<br /><br />Harmonie Shostakovitch - Conductor: Johan de Meij<br />La Fanciulla del West<br />Casanova - Johan van Iersel cello soloist<br />Te Deum<br />-.-.-.-. Intermission -.-.-.-.-<br />Da Vinci (A Study on Ivory Keys)<br />Angelo del Cielo - Johan van Iersel cello soloist<br />Jazz Suite No. 2<br />Encore:&nbsp;<br />Dance of the Elves - David Popper, Johan van Iersel cello soloist<br />February 09, 2020 - 8:00 pm Atrium, Viques - Switzerland<br />February 10, 2020 - 5:00 pm Atrium, Viques - Switzerland<br /><br />March 4-7<br />American Band Masters Conference<br />The Unites State Air Force Band<br />Vintage - David Gillingham<br />Johan de Meij, conductor - euphonium soloist Brandon Jones<br />Beau Rivage Magnolia Ballroom<br />March 6, 7.30 pm Biloxi, Mississippi - USA<br /><br />March 9-10<br />2019 New York International Music Festival<br />(World Projects International)<br />Carnegie Hall<br />New York NY - USA<br />&nbsp;</p><p>March 21-26 (POSTPONED tot 2021)\r\n</p><p>Hawaii Music Festival</p><p>World Projects International</p><p>Honolulu, Hawaii - USA</p><p>April 1-5 (POSTPONED)<br />Banda Musicale Città di Procida - Conductor: Johan de Meij, Francesco Trio alto sax soloist<br />The Witches' Sabbath - Giacomo Puccini<br />FELLINI (for alto sax, wind orchestra &amp; circus band)<br />Te Deum - Giacomo Puccini<br />-.-.-.-. Intermission -.-.-.-.-<br />Here comes Everybody - Anthony Fiumara (Italian Premiere)<br />Extreme Make-Over (for Wind Orchestra)<br />April 05, 2020 - 8:00 pm Abbazia di San Michele Arcangelo, Procida, Napoli - Italy<br /><br />Amsterdam Brass - Brandt Attema (POSTPONED)</p><p>&nbsp;</p><p>bass trombone&nbsp;soloist<br />Oosterkerk<br />April 11, 2020 - 8:00 pm Amsterdam - The Netherlands<br /><br />April 20-22 (CANCELLED)<br />2019 New York International Music Festival<br />(World Projects International)<br />Carnegie Hall<br />New York NY - USA<br /><br />April 23-25 (POSTPONED)<br />Buffalo-Niagara Concert Band<br />Symphony No. 5 Return to Middle Earth<br />Buffalo, New York - USA<br /><br />April 28-30 (POSTPONED)<br />University of Wisconsin River Falls<br />Fellini - with Hans de Jong, alto saxophone<br />River Falls, Wisconsin - USA<br /><br />May 3-5<br />Nagoya Wind Orchestra<br />Kariya Cultural Center<br />Nagoya &nbsp;- Japan<br /><br />May 6-10<br />Kyushu Wind Orchestra<br />Acros Concert Hall<br />Fukuoka - Japan<br /><br />May 28-31<br />Johan de Meij Band Festival<br />A Tribute to Bill Whelan<br />Limerick - Ireland&nbsp;<br /><br />July 2-5 (POSTPONED tot 2021)<br />International Trombone Festival</p><p>Osaka Concert Brass<br />Brandt Attema, bass trombone soloist<br />Osaka- Japan<br /><br />July 20-26 (POSTPONED tot 2021)<br />Banda Sinfónica de las Americas&nbsp;<br />San Andrès Cholula - Mexico<br />Symphony No. 5 Return to Middle Earth (Mexican Premiere)<br />With Oscar Navarro<br />July 23, Puebla - Auditorio de la Reforma or UDLAP.<br />July 24, Boca Forum, Boca del Río, Veracruz<br />July 25, Teopanzolco Cultural Center, Cuernavaca, Morelos.<br />July 26, Sala Blas Galindo, CENART, Mexico City<br />August 17-21</p><p>&nbsp;</p><p>EVAM Summer Course</p><p>Amarante, Portugal</p><p>October 8-10</p><p>&nbsp;</p><p>Buffalo-Niagara Concert Band, Kirstin Gornstein soprano &amp; Buffalo Philharmonic Chorus<br />Symphony No. 5 Return to Middle Earth<br />Buffalo, New York - USA</p><p>&nbsp;</p><p>October 26-28<br />Banda Sinfónica de Montevideo<br />Fellini - with Hans de Jong, alto saxophone<br />Montevideo - Uruguay<br /><br />November 5-7<br />Valparaiso University Chamber Concert Band &amp; Windiana Concert Band<br />Da Vinci<br />Fellini - with Hans de Jong, alto saxophone<br />Symphony No. 2 Big Apple<br />November 07 - 5:00 pm Chapel of the Resurrection, Valparaiso University, Valparaiso Indiana - USA<br /><br />December 11<br />World Projects International<br />Carnegie Hall<br />New York NY - USA</p></div> */}
        </Col>
        </Row>
    </Container>
    </section>
    </>)
}
function mapStateToProps(state) {
	return {
	  event: {...state.eventsReducer[0]}
	};
  }
  
  function mapDispatchToProps(dispatch) {
	return {
	  actions: bindActionCreators({mainAction}, dispatch)
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Events);
