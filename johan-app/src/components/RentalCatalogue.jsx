import React,{ useEffect , useState} from "react";
import {Table,Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
const RentalCatalogue  = (props) => {
  //const [selectedPresentation,setSelectedPresentation]= useState()
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Music"
       props.actions.mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE,{})
       props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadProfile = (id) =>{
      let selectedPresentation =[]
      props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE_BY_ID,id)
      selectedPresentation = props.presentations.filter(presentation => presentation.id === id)
      props.history.push('/music/profile/'+selectedPresentation[0]._id)
  }
  const missingProfile = () => {
    alert("profile not yet linked")
  }
    return (<>
    <section className="RentalCatalogue">
    
    <Container>
         <Row>
         <Col lg={{span:12}}>
             <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Catalogue No.</th>
      <th>Title</th>
      <th>Instrumentation</th>
      <th>Composer / Arranger</th>
      <th>Duration</th>
      <th>Price in € Cat. A</th>
      <th>Price in $ Cat. A</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(props.catalogue).map(catalogue=>{
      let _id = catalogue.link.slice(50,54)
        return (<tr onClick={()=> !isNaN(_id) === true ? loadProfile(_id):missingProfile()}>
            <td>{catalogue.catalogueNumber}</td>
            <td>{catalogue.title}</td>
            <td>{catalogue.instrumentation}</td>
            <td>{catalogue.composerArranger}</td>
            <td>{catalogue.duration}</td>
            <td>{catalogue.priceInEuros}</td>
            <td>{catalogue.priceInDollars}</td>
            </tr>)
    })}
  </tbody>
</Table>  
        </Col>
        </Row>
    </Container>
    </section> 
    {/* <section class="RentalCatalogue"><div class="container"><div class="row"><div class="col-lg-12"><table class="table table-sm table-striped table-bordered table-hover"><thead><tr><th>Catalogue No.</th><th>Title</th><th>Instrumentation</th><th>Composer / Arranger</th><th>Duration</th><th>Price in € Cat. A</th><th>Price in $ Cat. A</th></tr></thead><tbody><tr><td>AMR 01 </td><td>Gandalf (part I from The Lord of the Rings) </td><td>Symphony Orchestra </td><td>Johan de Meij, Henk de Vlieger</td><td>{5}''{6}</td><td>150,- </td><td>175.- </td></tr><tr><td>AMR 02</td><td>Lothlorien (part II from The Lord of the Rings)</td><td>Symphony Orchestra</td><td>Johan de Meij, Henk de Vlieger</td><td>{14}''{15}</td><td>150,-</td><td>175.-</td></tr><tr><td>AMR 03</td><td>Gollum (part III from The Lord of the Rings)</td><td>Symphony Orchestra</td><td>Johan de Meij, Henk de Vlieger</td><td>{23}''{24}</td><td>150,-</td><td>175.-</td></tr><tr><td>AMR 04</td><td>Journey in the Dark (part IV from The Lord of the Rings)</td><td>Symphony Orchestra</td><td>Johan de Meij, Henk de Vlieger</td><td>{32}''{33}</td><td>150,-</td><td>175.-</td></tr><tr><td>AMR 05</td><td>Hobbits (part V from The Lord of the Rings)</td><td>Symphony Orchestra</td><td>Johan de Meij, Henk de Vlieger</td><td>{41}''{42}</td><td>150,-</td><td>175.-</td></tr><tr><td>AMR 06</td><td>The Lord of the Rings (Complete Edition)</td><td>Symphony Orchestra</td><td>Johan de Meij, Henk de Vlieger</td><td>{50}''{51}</td><td>650,-</td><td>750.-</td></tr><tr><td>AMR 07</td><td>Skyline (part I from The Big Apple)</td><td>Symphony Orchestra</td><td>Johan de Meij</td><td>{59}''{60}</td><td>250,-</td><td>300.-</td></tr><tr><td>AMR 09</td><td>Gotham (part II from The Big Apple)</td><td>Symphony Orchestra</td><td>Johan de Meij</td><td>{68}''{69}</td><td>300,-</td><td>350.-</td></tr><tr><td>AMR 30</td><td>Two-Bone Concerto	</td><td>Two trombones &amp; brass band</td><td>Johan de Meij, Pierre Volders</td><td>{77}''{78}</td><td> 350,-	</td><td>400.-</td></tr><tr><td>AMR 10</td><td>The Big Apple (Complete Edition) </td><td>Symphony Orchestra </td><td>Johan de Meij </td><td>{86}''{87}</td><td>500,-</td><td>575.-</td></tr><tr><td>AMR 11</td><td>Lonely Planet (part I from Planet Earth) </td><td>Symphony Orchestra and Female Choir </td><td>Johan de Meij </td><td>{95}''{96}</td><td>300,- </td><td>350.-</td></tr><tr><td>AMR 12</td><td>Planet Earth (part II from Planet Earth) </td><td>Symphony Orchestra </td><td>Johan de Meij </td><td>{104}''{105}</td><td>300,- </td><td>350.-</td></tr><tr><td>AMR 13</td><td>Mother Earth (part III from Planet Earth) </td><td>Symphony Orchestra and Female Choir </td><td>Johan de Meij </td><td>{113}''{114}</td><td>300,- </td><td>350.-</td></tr><tr><td>AMR 14</td><td>Symphony no. 3 Planet Earth (Complete Edition) </td><td>Symphony Orchestra and Female Choir </td><td>Johan de Meij </td><td>{122}''{123}</td><td>750,- </td><td>850.-</td></tr><tr><td>AMR 15</td><td>Casanova </td><td>Cello and Symphony Orchestra </td><td>Johan de Meij, Ted Ricketts</td><td>{131}''{132}</td><td>400,- </td><td>450.-</td></tr><tr><td>AMR 16</td><td>Klezmer Classics </td><td>Symphony Orchestra </td><td>Johan de Meij </td><td>{140}''{141}</td><td>200,- </td><td>235.-</td></tr><tr><td>AMR 17</td><td>Windy City Overture </td><td>Symphony Orchestra </td><td>Johan de Meij </td><td>{149}''{150}</td><td>150,- </td><td>175.-</td></tr><tr><td>AMR 18</td><td>UFO Concerto </td><td>Euphonium and Symphony Orchestra </td><td>Johan de Meij </td><td>{158}''{159}</td><td>400,- </td><td>450.-</td></tr><tr><td>AMR 19</td><td>UFO Concerto - Festival Version (shortened) </td><td>Euphonium and Symphony Orchestra </td><td>Johan de Meij </td><td>{167}''{168}</td><td>300,- </td><td>350.-</td></tr><tr><td>AMR 20</td><td>Duet from  Don Carlo  </td><td>Two Trombones and Brass Band </td><td>Guiseppe Verdi, Johan de  Meij </td><td>{176}''{177}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 21</td><td>Pavane pour une Infante DÃ©funte</td><td>Trombone and Brass Band </td><td>Maurice Ravel, Johan de  Meij </td><td>{185}''{186}</td><td>70,- </td><td>80.-</td></tr><tr><td>AMR 28</td><td>Pavane pour une Infante DÃ©funte</td><td>Trombone and Fanfare Band </td><td>Maurice Ravel, Johan de  Meij </td><td>{194}''{195}</td><td>70,-</td><td>80.-</td></tr><tr><td>AMR 22</td><td>T-Bone Concerto</td><td>Trombone and Brass Band </td><td>Johan de Meij </td><td>{203}''{204}</td><td>300,- </td><td>350.-</td></tr><tr><td>AMR 23</td><td>Dance of the Elves </td><td>Cello and Wind Orchestra (original key) </td><td>David Popper, Johan de  Meij </td><td>{212}''{213}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 24</td><td>Dance of the Elves </td><td>Flute and Wind Orchestra  </td><td>David Popper , Johan de  Meij </td><td>{221}''{222}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 25</td><td>Dance of the Elves </td><td>Alto Sax and Wind Orchestra  </td><td>David Popper, Johan de  Meij </td><td>{230}''{231}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 26</td><td>Dance of the Elves </td><td>Euphonium and Wind Orchestra  </td><td>David Popper, Johan de  Meij </td><td>{239}''{240}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 31</td><td>Dance of the Elves </td><td>Trumpet-Trombone duet and Wind Orchestra  </td><td>David Popper, Johan de  Meij </td><td>{248}''{249}</td><td>60 ,-</td><td>70.-</td></tr><tr><td>AMR 33</td><td>Torna a Surriento (Return to Sorento) </td><td>Trombone and Wind Orchestra  </td><td>Anthony Fiumara, Johan de Meij </td><td>{257}''{258}</td><td>60,- </td><td>70.-</td></tr><tr><td>AMR 34</td><td>Sinfonietta No. 1</td><td>Symphonic Brass (4.4.4.1.1.) Harp &amp; Percussion</td><td>Johan de Meij</td><td>{266}''{267}</td><td>200,-</td><td>235.-</td></tr><tr><td>AMR 06/S</td><td>Symphony No. 1 The Lord of the Rings</td><td>Study Score  Symphonic Version (sale price)</td><td>Johan de Meij, Henk de Vlieger</td><td>{275}''{276}</td><td>55,-</td><td>60.-</td></tr><tr><td>AMR 35</td><td>Gandalf (part I from The Lord of the Rings) </td><td>Symphonic Brass (4.4.4.1.1.) Piano &amp; Percussion</td><td>Johan de Meij</td><td>{284}''{285}</td><td>100,-</td><td>115.-</td></tr><tr><td>AMR 36</td><td>Journey in the Dark (part IV from The Lord of the Rings)</td><td>Symphonic Brass (4.4.4.1.1.) Piano &amp; Percussion</td><td>Johan de Meij</td><td>{293}''{294}</td><td>100,-</td><td>115.-</td></tr><tr><td>AMR 37</td><td>Hobbits (part V from The Lord of the Rings)</td><td>Symphonic Brass (4.4.4.1.1.) Piano &amp; Percussion</td><td>Johan de Meij</td><td>{302}''{303}</td><td>100,-</td><td>115.-</td></tr><tr><td>AMR 38</td><td>Duet from Don Carlo</td><td>Two solo Trombones, Symphonic Brass &amp; Percussion</td><td>Giuseppe Verdi, arranged by Johan de Meij</td><td>{311}''{312}</td><td>50,-</td><td>55.-</td></tr><tr><td>AMR 27</td><td>Pavane pour une Infante DÃ©funte</td><td>Trombone, Symphonic Brass, Harp &amp; Timpani</td><td>Maurice Ravel, Johan de  Meij </td><td>{320}''{321}</td><td>50,-</td><td>55.-</td></tr><tr><td>AMR 39</td><td>William Tell Overture (Finale)</td><td>Symphonic Brass &amp; Percussion</td><td>Gioachino Rossini, Johan de  Meij</td><td>{329}''{330}</td><td>70,-</td><td>80.-</td></tr><tr><td>AMR 40</td><td>Fanfare pour prÃ©cÃ©der La PÃ©ri</td><td>Symphonic Brass (4.4.4.1.) </td><td>Paul Dukas, Johan de  Meij</td><td>{338}''{339}</td><td>50,-</td><td>55.-</td></tr><tr><td>AMR 41</td><td>Canticles</td><td>Bass trombone &amp; brass band</td><td>Johan de Meij</td><td>17</td><td>250</td><td>300</td></tr><tr><td>AMR 42</td><td>Symphony no. 3 Planet Earth (Cine-Symphony Version) </td><td>Symphony Orchestra, Female Choir + Film</td><td>Johan de Meij</td><td>{355}''{356}</td><td>750,- </td><td>850.-</td></tr></tbody></table></div></div></div></section> */}
    </>)
}
function mapStateToProps(state) {
    return {
        catalogue:state.catalogueReducer,
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
  )(RentalCatalogue);
