import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import Article from "components/shared/Article"
import {Row} from "react-bootstrap"
import { Link } from "react-router-dom"
import _ from "lodash"

const News  = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        //props.actions.mainAction(ACTIONS.RESET_IMAGE,{})
        props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (<>
    <section className="news">
    <div className="container">
    <Row>
        {Object.values((_.orderBy(props.posts,'postDate','desc'))).map(article => {

          let articleImage =Object.values(props.postImages).filter(image => image.albumID == article.ID).map(postImage =>{
            return postImage
          })
          if(articleImage[0])
            return <Article key={article._id} {...props}{...article} image={articleImage[0] ? articleImage[0]:"missing.png"} />
        })}
    </Row>
    </div>
    </section>
    </>)
}
function mapStateToProps(state) {

    return {
      posts:_.filter(state.postsReducer,function(post){
        return post.showPost === true
      }),
      postImages:state.postImagesReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(News);
 