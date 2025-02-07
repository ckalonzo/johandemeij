import React, { useEffect,useState} from "react";
import {Row,Col} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import dayjs from "dayjs"
import ReactHtmlParser from 'react-html-parser';
const Article = (props) => {
    
    useEffect(() => {
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const {postTitle,postContent,postDate,_id} = props
    const [loadedImage,setLoadeImage] = useState("/images/missing.png")
    const truncateString = (str, num) => str.length <= num ? str : `${str.slice(0, num)}...`;
    function truncateText(markup,val) {
      if (markup.length <= val) {
        return markup;
      }
    
      let truncated = markup.substring(0, val);
    
      const openTagRegex = /<(\w+)([^>]*?)>$/;
      const closeTagRegex = /<\/(\w+)>$/;
    
        if (openTagRegex.test(truncated) && !closeTagRegex.test(truncated)) {
            truncated = truncated.replace(openTagRegex, '');
        }
    
    
      return (truncated) + "...";
    }
      const loadPost = (props) => {
        props.history.push(`/post/${_id}`)
      }
      const renderImage = (props) => {
        if(props.image[0]){
          
        return <a href={`/post/${props.ID}`}><img src={"https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image[0].imageName+"?alt=media"} width="300px" max-height="180px" /></a>}
        //setLoadeImage("/images/posts/"+props.image[0].imageName)
        return <img src={loadedImage} width="300px"  />
      }
    const renderArticle = (props,mainProps) => {
      let date = dayjs(postDate)
        return (<>
        <Row style={{marginBottom:"25px"}}>
          <Col sm={12} md={6} lg={4} xl={3}className="card-image" style={{overflow:"hidden"}}>
{renderImage(props)}

          </Col>
          <Col sm={12} md={6}  lg={8} xl={9} className="card-body">
            <div className="card-date">{date.format('MMMM DD YYYY')}</div> 
            <div className="card-title">{truncateString(postTitle,147)}</div>
            <div className="card-text" style={{maxHeight:"130px",overflow:"hidden"}}>{truncateString(ReactHtmlParser(postContent),500)}</div>
            <div className="card-link"><a href={`/post/${props.ID}`}>More...</a></div>
          </Col>
        </Row>
        </>)
    }
   // console.log(props)
    return (<>
    <Col lg={{span:"12" }} >
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
