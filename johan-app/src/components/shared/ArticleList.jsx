import React, { useEffect} from "react";
import {Col} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import dayjs from "dayjs"
const Article = (props) => {
    useEffect(() => {
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const stripHtml = require("string-strip-html")
    const {postTitle,postContent,image,_id,postDate} = props
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str
          }
          return str.slice(0, num) + '...'
      }
      const loadPost = (post) => {
        window.scrollTo(0,0)
        //Object.values(posts).filter(post => post._id === props.match.params.id)
        props.actions.mainAction(ACTIONS.LOAD_ARTICLE,post)
        props.history.push(`/post/${post.ID}`)
      }
    const renderArticle = () => {
      let date = dayjs(postDate)
        let imagePath = Object.keys(image).length > 0 ? "https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+image.imageName+"?alt=media":"images/missing.png"
            let styles = {
            backgrounSize:"contain",
            maxHeight:"180px",
            width:"100%",
            backgroundPosition:"50% 50%",
            overflow:"hidden"
        }
        return (<>
        <div className="">
          <div className="card-image" style={styles}>
          <a href={"/post/"+props.ID}><img src={"https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image[0].imageName+"?alt=media"} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 10%",border:"none"}}/></a></div>
          <div className="card-body">
            <div className="card-date">{date.format('MMMM DD YYYY')}</div> 
            <div className="card-title">{truncateString(postTitle,47)}</div>
            <div className="card-text" style={{marginBottom:"10px"}}>{truncateString(stripHtml(postContent),70)}</div>
            <div className="card-link"><a href={"/post/"+props.ID}>More...</a></div>
          </div>
        </div>
        </>)
    }
    return (<>
    <Col lg={{span:"12" }}>
    {renderArticle()}
    </Col>
    </>)
}
function mapStateToProps(state) {
    return {
      post:state.singlePostReducer,
      postImages:state.postImagesReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Article);
