import React,{useEffect} from "react";
import {Row,Col,Container} from "react-bootstrap"
const Biography  = () => {
    useEffect(() => { 
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Biograpy"
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    let styles = {
        backgrounSize:"cover",
        maxHeight:"300px",
        width:"100%",
        backgroundPosition:"50% 10%",
        overflow:"hidden"
    }
    return (<>
    <section className="about-full">
    
    <Container>
         <Row>
         <Col  lg={{span:5,offset:1}}>
        <div className="bio-photo" style={styles}>
 <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fpic3_download.jpg?alt=media`} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 10%"}} alt="biogrophy"/>
        </div>
        
         <h5>Downloads</h5>
         <ul>
             <li><a href="/images/albums/download.php?f=pic2_download.jpg"><img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fpic2.jpg?alt=media&token=0ca9ec23-b6a6-4382-ac01-653fdd45e5b7" width="59" height="59" border="0" /></a></li>
             <li><a href="/images/albums/download.php?f=pic3_download.jpg"><img src="/images/albums/pic3.jpg" width="59" height="59" border="0" /></a></li>
             <li><a href="/images/albums/download.php?f=pic4_download.jpg"><img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fpic4_download.jpg?alt=media&token=a32fbcfb-26da-4d24-b12d-ee116e02fc16" width="59" height="59" border="0" /></a></li>
             <li><a href=""><img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fpic1.jpg?alt=media&token=a8906dfc-a1fc-4355-8d2d-b5a43da533c4" width="59" height="59" border="0" /></a></li>
         </ul>
         <h5>Flyers</h5>
         <ul>
             <li><a href="/docs/Music-for-Orchestra-Johan-de-meij-2017.pdf"><img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fmusic_for_orchestra.png?alt=media&token=7c02b225-07ac-4da4-bf24-db4863d37658" width="59" height="59" border="0" /></a></li>
             <li><a href="/docs/Johan-de-Meij-2017.pdf"><img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/albums%2Fpdf2.jpg?alt=media&token=ac92d133-11e8-48b8-81b9-5742bfdae3bd" width="59" height="59" border="0" /></a></li>
         </ul>
         <h5>Biographies</h5>
         <ul>
             <li><a href="/docs/english.doc">English</a></li>
             <li><a href="/docs/dutch.doc">Dutch</a></li>
             <li><a href="/docs/german.doc">German</a></li>
             <li><a href="/docs/Bio%20Spanish.doc">Spanish</a></li>
         </ul>
         </Col>
         <Col lg={{span:6}}>
             <h3 style={{fontSize:"3rem",textTransform: "uppercase"}}>About</h3>
             <p>
	Dutch composer and conductor Johan de Meij (Voorburg, 1953) received his musical training at the Royal Conservatory of Music in The Hague, where he studied trombone and conducting. His award-winning oeuvre of original compositions, symphonic transcriptions and film score arrangements has garnered him international acclaim and have become permanent fixtures in the repertoire of renowned ensembles throughout the world. His Symphony No. 1&nbsp;<em>The Lord of the Rings</em> was awarded the prestigious Sudler Composition Prize and has been recorded by myriad ensembles including The London Symphony Orchestra, The North Netherlands Orchestra, The Nagoya Philharmonic and The Amsterdam Wind Orchestra. His Symphony No. 2&nbsp;<em>The Big Apple,&nbsp;</em>Symphony No. 3<em>&nbsp;Planet Earth,&nbsp;</em>Symphony No. 4&nbsp;<em>Sinfonie der Liede</em><em>r </em>as well as his solo concertos, <em>T-Bone Concerto </em>(trombone),<em> UFO Concerto </em>(euphonium)&nbsp;and <em>Casanova</em> (cello) have been enthusiastically received at many of the world’s finest venues.</p>
    <p>
	Before devoting his time exclusively to composing and conducting, Johan de Meij enjoyed a successful professional career as a trombone and euphonium player, performing with major orchestras and ensembles in The Netherlands. He is in high demand as a guest conductor and lecturer, frequently invited to speak&nbsp;about and perform his own works. In 2010, he was appointed regular guest conductor of the <strong>Simón Bolívar Youth Wind Orchestra</strong> in Caracas, Venezuela – part of the celebrated Venezuelan educational system <em>El Sistema</em>. He currently maintains posts with both the<strong> New York Wind Symphony</strong> and the <strong>Kyushu Wind Orchestra</strong> in Fukuoka, Japan as their principal guest conductor. Johan is founder and CEO of his own publishing company Amstel Music, established in 1989.</p>
    <p>
	When not traveling, Johan divides his time between his Hudson Valley home and Manhattan apartment with his wife and muse Dyan, cats Lenny &amp; Tosca and dog Lucy</p>
<p>
	To follow Johan's whereabouts, please click <a href="http://www.johandemeij.com/events.php">EVENTS</a></p>
<p>
	&nbsp;</p>
<p>
	<strong>Awards and Prizes:</strong></p>
    <p>
	1989 1<sup>st</sup> Prize at The Sudler International Composition Competition Award for <strong>Symphony no.1 The Lord of the Rings</strong></p> 
    <p>
	1995 Honorable Mention International Composition Competition of Corciano - Italy for <strong>Symphony No. 2 The Big Apple</strong></p> 
    <p>
	1999 1<sup>st</sup> Prize at The International Composition Competition of Corciano - Italy for <strong>Casanova </strong>(for cello &amp; wind orchestra)</p>
    <p>
    2000 1<sup>st</sup> Prize at The Oman International Composition Prize for <strong>The Red Tower</strong>
    </p>
    <p>
    2001 The Midwest Clinic International Award - Chicago, Illinois - USA
    </p>
    <p>
    2006 2<sup>nd</sup> Prize at The International Composition Competition of Corciano - Italy for <strong>Symphony No. 3 Planet Earth</strong>
    </p>
    <p>
	2007 Dutch Wind Music Award/Prijs Nederlandse Blaasmuziek</p>
<p>
	2009 Friends of the WMC Award - Kerkrade, The Netherlands</p>
<p>
	2016 2<sup>nd</sup> Prize at The International Composition Competition of Corciano - Italy for <strong>Echoes of San Marco</strong></p>
    <p>
	2016 1<sup>st</sup> Prize at The 6th International Composition Contest City of Muro - Spain for <strong>Fifty Shades of E</strong></p>
<p>
	2017 Buma Classical Award - The Netherlands</p>
<p>
	2017 Nominated for the Vermeulen Prize 2017 for <strong>FELLINI</strong> (Omaggio a Federico Fellini)</p>
<p>
	2017 Finalist for the WASBE Composition Contest with <strong>African Harmony</strong> (Songs from Mama Africa)</p>
<p>
	2018 Midwest Clinic Legend Award for Lifetime Contributions to Music Education - Chicago, Illinois - USA</p>
<p>
	2019 Nominated for the Vermeulen Prize 2019 for <strong>Symphony No. 5 Return to Middle Earth</strong></p>
        </Col>
         
        </Row>
    </Container>
    </section>
    </>)
}
export default Biography