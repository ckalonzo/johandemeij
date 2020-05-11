import React,{ useEffect,useState } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
import SorenHyldgaard from "components/SorenHyldgaard"
import Cds from "components/Cds"
const Music  = (props) => {
    const [categoryID,setCategoryID] = useState(7);
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music"
       props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadCategory = (id) => {
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_BY_CATEGORY,id)
        setCategoryID(id)
    }
    const loadProfile = (id) =>{
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE,id)
        props.history.push('/music/profile/'+id)
    }
    return (<>
    {/* <section className="music">
    
    <Container>
         <Row>
         <Col>
             <h3 style={{fontSize:"1.5rem",textTransform: "uppercase",color:"#000",textAlign:"center"}}>Music</h3>
            <ul className="categories">
                {props.categories.map((category,i) => {
                    return <li key={i} className={category.id === categoryID ? "active":""} onClick={()=>loadCategory(category.id)}>{ReactHtmlParser(category.name)}</li>
                })}
            </ul>
        </Col>
        </Row>
        {categoryID === 5 ? <SorenHyldgaard /> : ""}
        {categoryID === 9 ? <Cds /> : ""}
        <Row>
            <Col lg={{span:6}}>
            <ul>
                {props.allPresentations.map((presentation ,i)=>{
                    if(i < 77 && presentation.cdName.indexOf("{{") === -1)
                    return <li key={i}><span onClick={()=>loadProfile(presentation._id)}>{ReactHtmlParser(presentation.cdName)}</span></li>
                })}
            </ul>
            </Col>
            <Col lg={{span:6}}>
            <ul>
                {props.allPresentations.map((presentation,i)=>{
                    if(i > 77 && presentation.cdName.indexOf("{{") === -1)
                    return <li  key={i}><span onClick={()=>loadProfile(presentation._id)}>{ReactHtmlParser(presentation.cdName)}</span></li>
                })}
            </ul>
            </Col>
        </Row>
    </Container>
    </section> */}
    <section class="music"><div class="container"><div class="row"><div class="col"><h3 style={{fontSize: "1.5rem", textTransform: "uppercase", color: "rgb(0, 0, 0)", textAlign: "center"}}>Music</h3><ul class="categories"><li class="">Compositions</li><li class="">Amstel Classics</li><li class="">Music for the Theatre</li><li class="">Symphony Orchestra</li><li class="">The Music of Søren Hyldgaard</li><li class="">Solo Concertos</li><li class="">Cd's</li><li class="">All music</li></ul></div></div><div class="row"><div class="col-lg-6"><ul><li><span>25 Years Symphony No. 1 The Lord of the Rings</span></li><li><span>African Harmony (Songs from Mama Africa)</span></li><li><span>Aladdin Suite - Carl Nielsen</span></li><li><span>American Suite - AntonÃ&shy;n DvoÅ™Ã¡k</span></li><li><span>Ancalagon the Black</span></li><li><span>Andante &amp; Alla Marcia - AntonÃ&shy;n DvoÅ™Ã¡k</span></li><li><span>Angelo del Cielo - Giacomo Puccini</span></li><li><span>Aquarium</span></li><li><span>At Kitty Oâ€™Sheaâ€™s</span></li><li><span>Bagatelle</span></li><li><span>Basilica Sacra</span></li><li><span>Canticles (Bass trombone &amp; brass band)</span></li><li><span>Canticles (Bass trombone &amp; piano)</span></li><li><span>Canticles (Bass trombone &amp; wind orchestra)</span></li><li><span>Casanova</span></li><li><span>Casanova (Orchestral Version)</span></li><li><span>Celtic Classics</span></li><li><span>Ceremonial Fanfare</span></li><li><span>Ceremonial Fanfare</span></li><li><span>Ceremonial Fanfare (for brass band)</span></li><li><span>Circus Band Music [from FELLINI]</span></li><li><span>Clair de Lune - Claude Debussy</span></li><li><span>Cloud Factory</span></li><li><span>Continental Overture</span></li><li><span>Da Vinci (A Study on Ivory Keys)</span></li><li><span>Dance I (from Jazz Suite No. 2) - Dmitri Shostakovich</span></li><li><span>Dance II (from Jazz Suite No. 2) - Dmitri Shostakovich</span></li><li><span>Dance of the Amazon - Anatoli Liadov</span></li><li><span>Dance of the Elves - David Popper</span></li><li><span>Der Tod und das MÃ¤dchen - Franz Schubert </span></li><li><span>Downtown Divertimento</span></li><li><span>Duet from Don Carlo (2 solo trombones &amp; wind orchestra) - Giuseppe Verdi</span></li><li><span>Duet from Don Carlo (two solo trombones &amp; brass band) - Giuseppe Verdi</span></li><li><span>Duet from Don Carlo (two solo trombones, symphonic brass &amp; percussion) - Giuseppe Verdi</span></li><li><span>Duet from The Pearl Fishers (two solo trombones &amp; wind orchestra) - Georges Bizet</span></li><li><span>Dutch Masters Suite</span></li><li><span>Echoes of San Marco</span></li><li><span>Edgar - Giacomo Puccini</span></li><li><span>Elisabeth - the Musical</span></li><li><span>Empire of Light (from The Venetian Collection)</span></li><li><span>Evolution</span></li><li><span>Extreme Beethoven</span></li><li><span>Extreme Make-Over (Brass Band)</span></li><li><span>Extreme Make-Over (for Wind Orchestra)</span></li><li><span>Extreme Make-over (Fanfare)</span></li><li><span>FELLINI (for alto sax, wind orchestra &amp; circus band)</span></li><li><span>Fanfare pour prÃ©cÃ©der La PÃ©ri - Paul Dukas</span></li><li><span>Fantasia Napoletana - Anthony Fiumara</span></li><li><span>Festive Hymn</span></li><li><span>Fifty Shades of E</span></li><li><span>Finale (from Jazz Suite no. 2) - Dmitri Shostakovich</span></li><li><span>Funeral Music - Edvard Grieg</span></li><li><span>Gandalf (part I from Symphony no. 1 The Lord of the Rings)</span></li><li><span>Gandalf (part I from The Lord of the Rings) for Symphonic Brass, Piano &amp; Percussion</span></li><li><span>Gollum (part III from Symphony no. 1 The Lord of the Rings)</span></li><li><span>Gotham (part II from Symphony no. 2 The Big Apple)</span></li><li><span>Hans Christian Andersen Suite</span></li><li><span>Henry V (Suite from the Movie) </span></li><li><span>Hobbits (part V from Symphony no. 1 The Lord of the Rings)</span></li><li><span>Hobbits (part V from The Lord of the Rings) for Symphonic Brass, Piano &amp; Percussion</span></li><li><span>Hobbits Dance &amp; Hymn</span></li><li><span>Hobbits Dance &amp; Hymn (Fanfare Band)</span></li><li><span>Jazz Suite No. 2 - Dmitri Shostakovich</span></li><li><span>Joropo - MoisÃ©s Moleiro</span></li><li><span>Journey in the Dark (part IV from Symphony no. 1 The Lord of the Rings)</span></li><li><span>Journey in the Dark (part IV from The Lord of the Rings) for Symphonic Brass, Piano &amp; Percussion</span></li><li><span>Jupiter Hymn - Gustav Holst </span></li><li><span>Klezmer Classics</span></li><li><span>Klezmer Classics (Orchestral Version)</span></li><li><span>Korean Navy Fanfare</span></li><li><span>La Danza - Rossini/Respighi </span></li><li><span>La Fanciulla del West - Giacomo Puccini</span></li><li><span>La Quintessenza</span></li><li><span>Loch Ness</span></li><li><span>Lonely Planet (part I from Symphony no. 3 Planet Earth)</span></li><li><span>Lothlorien (part II from The Lord of the Rings)</span></li><li><span>Lyric Waltz (from Jazz Suite no. 2) - Dmitri Shostakovich</span></li></ul></div><div class="col-lg-6"><ul><li><span>Magic Garden (from The Venetian Collection)</span></li><li><span>March (from Jazz Suite no. 2) - Dmitri Shostakovich</span></li><li><span>Marche Americana</span></li><li><span>Medium (Movement II from T-bone Concerto)</span></li><li><span>Mother Earth (part III from Symphony no. 3 Planet Earth)</span></li><li><span>Oriental Festival March - Carl Nielsen </span></li><li><span>Pavane pour une Infante DÃ©funte (solo trombone &amp; brass band)</span></li><li><span>Pavane pour une Infante DÃ©funte (solo trombone &amp; fanfare)</span></li><li><span>Pavane pour une Infante DÃ©funte (solo trombone &amp; wind orchestra)</span></li><li><span>Pavane pour une Infante DÃ©funte (solo trombone, symphonic brass, harp &amp; timpani)</span></li><li><span>Pennsylvania Faux Songs</span></li><li><span>Pentagram</span></li><li><span>Planet Earth (part II from Symphony no. 3 Planet Earth)</span></li><li><span>Polish Christmas Music</span></li><li><span>Rapsodia Borealis (Reduction for Trombone and Piano)</span></li><li><span>Rapsodia Borealis (for  Trombone and Wind Orchestra)</span></li><li><span>Rare (Movement I from T-bone Concerto)</span></li><li><span>Ratatouille Satirique - Erik Satie/arr. Johan de Meij </span></li><li><span>Requiem Ã†ternam</span></li><li><span>Riverdance (Highlights from)</span></li><li><span>Sinfonia Espansiva - Carl Nielsen</span></li><li><span>Sinfonietta No. 1 (for brass band)</span></li><li><span>Sinfonietta No. 1 (for symphonic brass, harp &amp; percussion)</span></li><li><span>Sinfonietta No. 1 (for wind orchestra)</span></li><li><span>Skyline (from Symphony No. 2 The Big Apple)</span></li><li><span>Songs from the Catskills</span></li><li><span>Spring</span></li><li><span>Summer</span></li><li><span>Surround Sound</span></li><li><span>Symphony No. 1 The Lord of the Rings</span></li><li><span>Symphony No. 2 The Big Apple</span></li><li><span>Symphony No. 3 Planet Earth</span></li><li><span>Symphony No. 4 Sinfonie der Lieder (Piano Reduction)</span></li><li><span>Symphony No. 4 Sinfonie der Lieder (Symphony of Songs)</span></li><li><span>Symphony No. 5 Return to Middle Earth</span></li><li><span>Symphony no. 1 The Lord of the Rings (Orchestral Version)</span></li><li><span>Symphony no. 2 The Big Apple (Orchestral Version)</span></li><li><span>Symphony no. 3 Planet Earth (Cine-Symphony Version) </span></li><li><span>Symphony no. 3 Planet Earth (Orchestral Version)</span></li><li><span>T-Bone Concerto (for trombone &amp; brass band)</span></li><li><span>T-Bone Concerto (for trombone &amp; piano)</span></li><li><span>T-Bone Concerto (for trombone &amp; wind orchestra)</span></li><li><span>Te Deum - Giacomo Puccini</span></li><li><span>The Kingâ€™s March</span></li><li><span>The Lord of the Rings (Excerpts) - for wind orchestra</span></li><li><span>The Lord of the Rings (Excerpts) for Fanfare Band</span></li><li><span>The Lord of the Rings (Excerpts) for Orchestra</span></li><li><span>The Red Tower</span></li><li><span>The Seville Suite (Highlights from)</span></li><li><span>The Venetian Collection</span></li><li><span>The Wind in the Willows</span></li><li><span>The Woman in White</span></li><li><span>Tintin - Prisoners of the Sun</span></li><li><span>Tivoli Festival Overture</span></li><li><span>To My Country - Bernard Zweers/Arr. Johan de Meij</span></li><li><span>Torna a Surriento (Return to Sorento)</span></li><li><span>Triumphal March - Modeste Moussorgsky/Arr. Johan de Meij</span></li><li><span>Trois Rag-Caprices - Darius Milhaud</span></li><li><span>Two-Bone Concerto (for 2 trombones &amp; piano)</span></li><li><span>Two-Bone Concerto (two solo trombones &amp; brass band)</span></li><li><span>Two-Bone Concerto (two solo trombones &amp; wind orchestra)</span></li><li><span>UFO Concerto (Orchestral Version)</span></li><li><span>UFO Concerto (euphonium &amp; brass band)</span></li><li><span>UFO Concerto (euphonium &amp; piano)</span></li><li><span>UFO Concerto (euphonium &amp; wind orchestra)</span></li><li><span>Un Momento Dado - Homenaje en Memoria de Johan Cruijff (1947-2016) For Reed Quintet &amp; Wind Orchestra</span></li><li><span>Via Claudia</span></li><li><span>Virtual Bones</span></li><li><span>Voice of Space</span></li><li><span>Waltz No. 2 (from Jazz Suite no. 2) - Dmitri Shostakovich</span></li><li><span>Well Done (Movement III from T-bone Concerto)</span></li><li><span>William Tell Overture (Finale) - Gioachino Rossini</span></li><li><span>William Tell Overture (Finale) - Gioachino Rossini</span></li><li><span>Wind Power</span></li><li><span>Windy City Overture</span></li><li><span>Windy City Overture (Orchestral Version)</span></li><li><span>carl k test</span></li></ul></div></div></div></section>
    </>)
}
function mapStateToProps(state) {
    return {
        categories:state.musicReducer.categories,
        allPresentations:state.musicReducer.allPresentations
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
  )(Music);
