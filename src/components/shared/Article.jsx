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
        //Object.values(posts).filter(post => post._id === props.match.params.id)
        props.actions.mainAction(ACTIONS.LOAD_ARTICLE,post)
        props.history.push(`/post/${post._id}`)
      }
    const renderArticle = () => {
      let date = dayjs(postDate)
        let imagePath = Object.keys(image).length > 0 ? "/images/posts/"+image.imageName:"images/missing.png"
            let styles = {
            backgrounSize:"contain",
            maxHeight:"250px",
            width:"100%",
            backgroundPosition:"50% 50%",
            overflow:"hidden"
        }
        return (<><div className="news-card">
        <div className="card-image" style={styles}><img src={imagePath} style={{width:"100%",backgrounSize:"cover",backgroundPosition:"50% 50%"}} onClick={()=>loadPost(props)}/></div>
        <div className="card-body">
        <div className="card-date">{date.format('MMMM DD YYYY')}</div> 
        <div className="card-title">{truncateString(postTitle,47)}</div>
        <div className="card-text">{truncateString(stripHtml(postContent),70)}</div>
      
        <div className="card-link" onClick={()=>loadPost(props)}>More...</div>
        </div>
        </div></>)
    }
    console.log(props)
    return (<>
    <Col lg={{span:"4" }}>
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
