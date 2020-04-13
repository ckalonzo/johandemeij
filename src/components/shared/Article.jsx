import React, { useEffect} from "react";
import {Col} from "react-bootstrap"
import {Link } from "react-router-dom"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
const Article = (props) => {
    useEffect(() => {
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const stripHtml = require("string-strip-html")
    const {postTitle,postContent} = props
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str
          }
          // Return str truncated with '...' concatenated to the end of str.
          return str.slice(0, num) + '...'
      }
   let imagePath = props ? "/images/posts/".props.image.imageName:"/images/posts/No.%205%20JPEG.jpg"
    let styles = {
        backgroundImage:`url(${imagePath})`,
        backgrounSize:"cover",
        minHeight:"150px",
        backgroundPosition:"50% 10%"
    }
    console.log(props.image ? props.image.imageName:"")
    return (<>
    <Col lg={{span:"4" }}>
    <div className="news-card">
        <div className="card-image" style={styles}></div>
        <div className="card-body">
        <div className="card-title">{truncateString(postTitle,30)}</div>
        <div className="card-text">{truncateString(stripHtml(postContent),50)}</div>
        <div className="card-link"><Link to="/">...more</Link></div>
        </div>
        </div>
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
