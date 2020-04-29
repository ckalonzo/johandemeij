import React,{useEffect} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import {Container,Row,Col} from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser';
import dayjs from "dayjs"
import ArticleList from "components/shared/ArticleList"
import _ from "lodash"
const Post = (props) => {
    const {postTitle,postDate} = props.post
    let date = dayjs(postDate)
    // const [post,setPosts] =useState();
    // const [image,setImage] = useState()
    useEffect(() => {
    window.scrollTo(0,0)
    props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
   // let singlePost = Object.values(props.posts).filter(post => post._id === props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_ARTICLE,props.post)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const LeadImage = () => {
        let articleImage = []
        props.post.map(post => {
            articleImage = Object.values(props.postImages).filter(image => image.albumID == post.ID).map(postImage =>{
                return postImage
              })
        })
        let styles = {
            maxWidth:"100%",
            backgrounSize:"contain",
            height:"500px",
            backgroundPosition:"50% 50%"
        }
         return  <div style={{maxHeight:"auto",overflow:"hidden",textAlign:"center"}}>
            <img src={articleImage[0] ? "/images/posts/"+articleImage[0].imageName:"/images/missing.png"} style={styles} alt="" />
         </div>
    }

    return (<>
        <Container>
            <section className="article">
                <Row>
                    <Col>{props.post.length > 0 ? <LeadImage  {...props}/> : ""}
                    
                    </Col>
                </Row>
            <Row>
                <Col lg={{span:8}}>
                    <h1 style={{ color: "#9a0000",margin:"50px 0 15px",textAlign:"center",font: "400 32px/34px 'Work Sans', sans-serif"}}>{Object.keys(props.post).length > 0 ? props.post[0].postTitle : "Title" }</h1>
                    <p style={{ color: "#000",textAlign:"center"}}>{Object.keys(props.post).length > 0 ?  dayjs(props.post[0].postDate).format('MMMM DD YYYY') : "Date" }</p>
                    <div className="conten">{Object.keys(props.post).length > 0 ? ReactHtmlParser(props.post[0].postContent):"content"}</div>
                </Col>
                <Col lg={{span:4}} style={{marginTop:"50px"}}>
                <Row>
        {Object.values((_.orderBy(props.posts,'postDate','desc'))).map(article => {

          let articleImage =Object.values(props.postImages).filter(image => image.albumID == article.ID).map(postImage =>{
            return postImage
          })
          if(articleImage[0])
            return <ArticleList key={article._id} {...props}{...article} image={articleImage[0] ? articleImage[0]:"missing.png"} />
        })}
    </Row>
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
      posts:state.postsReducer,
      postImages:state.postImagesReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);