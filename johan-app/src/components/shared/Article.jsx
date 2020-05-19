import React, { useEffect,useState} from "react";
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
    const {postTitle,postContent,image,_id,postDate,postImage} = props
    const [loadedImage,setLoadeImage] = useState("/images/missing.png")
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str
          }
          return str.slice(0, num) + '...'
      }
      const loadPost = (props) => {
        props.history.push(`/post/${_id}`)
      }
      const renderImage = (props) => {
        if(props.image[0]){
          
        return <a href={`/post/${props.ID}`}><img src={"https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image[0].imageName+"?alt=media"} width="100%" max-height="180px" /></a>}
        //setLoadeImage("/images/posts/"+props.image[0].imageName)
        return <img src={loadedImage} width="100%" height="180px" />
      }
    const renderArticle = (props,mainProps) => {
      console.log(props)
      let date = dayjs(postDate)
      console.log(props.image[0].imageName)
        return (<>
        <div className="news-card">
          <div className="card-image" style={{height:"180px",overflow:"hidden",width:"120px",background:`url(https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F${props.image[0].imageName})?alt=media`}}>
{renderImage(props)}
          </div>
          <div className="card-body">
            <div className="card-date">{date.format('MMMM DD YYYY')}</div> 
            <div className="card-title">{truncateString(postTitle,47)}</div>
            <div className="card-text">{truncateString(stripHtml(postContent),70)}</div>
            <div className="card-link"><a href={`/post/${props.ID}`}>More...</a></div>
          </div>
        </div>
        </>)
    }
   // console.log(props)
    return (<>
    <Col lg={{span:"6" }} >
    {renderArticle(props)}
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
