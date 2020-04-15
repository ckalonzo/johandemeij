import React,{useEffect,useState} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import {Container,Row,Col} from "react-bootstrap"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Post = (props) => {
    const [post,setPosts] =useState()
    useEffect(() => {
    
    props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
    let singlePost = Object.values(props.posts).filter(post => post._id === props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_ARTICLE,props.post)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    let styles = {
        maxHeight:"500px",
        width:"100%",
        backgroundPosition:"10% 50%",
        overflow:"hidden"
    }
    //console.log(props.match.params ? props.match.params.id:"")
    //console.log(Object.values(props.posts).filter(post => post._id === props.match.params.id))
    console.log(props.post[0])
    return (<>
        <Container>
            <section className="article">
            <Row>
                <Col style={styles} className="lead-image" >
                    <img src={`/images/posts/${Object.keys(props.post).length > 0 ? props.post[0]:""}`} style={{width:"100%",backgrounSize:"cover"}} />
                </Col>
            </Row>
            <Row>
                <Col>
    <h1>{Object.keys(props.post).length > 0 ? props.post[0].postTitle:"Title"}</h1>
    <div className="conten">{Object.keys(props.post).length > 0 ? ReactHtmlParser(props.post[0].postContent):"Title"}</div>
                </Col>
            </Row>
            </section>
        </Container>
    </>
    )
}
function mapStateToProps(state,props) {
    let allposts = state.postsReducer
    return {
      post:Object.values(allposts).filter(post => post._id === props.match.params.id),
      posts:state.postsReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);