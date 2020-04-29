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
        if(props[0]){
        return <img src={"/images/posts/"+props[0].imageName} width="100%" max-height="180px" />}
        return <img src={loadedImage} width="100%" height="180px" />
      }
    const renderArticle = (props,mainProps) => {
      let date = dayjs(postDate)
        return (<>
        <div className="news-card">
          <div className="card-image" style={{height:"180px",overflow:"hidden"}} onClick={()=>loadPost(mainProps)}>
{renderImage(props)}
          </div>
          <div className="card-body">
            <div className="card-date">{date.format('MMMM DD YYYY')}</div> 
            <div className="card-title">{truncateString(postTitle,47)}</div>
            <div className="card-text">{truncateString(stripHtml(postContent),70)}</div>
            <div className="card-link" onClick={()=>loadPost(mainProps)}>More...</div>
          </div>
        </div>
        </>)
    }
    return (<>
    <Col lg={{span:"4" }} >
    {renderArticle(props.postImage,props)}
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
