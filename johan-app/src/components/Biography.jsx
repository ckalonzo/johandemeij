import React,{ useEffect,useState } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import ReactHtmlParser from 'react-html-parser';
const Biography  = (props) => {
    useEffect(() => { 
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Biograpy"
        props.actions.mainAction(ACTIONS.LOAD_PAGE,"ccABrrzbrMWBgkVJx7oZ")
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
             {ReactHtmlParser(props.biography.content)}
        </Col>
         
        </Row>
    </Container>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        biography:state.pageReducer
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
  )(Biography);