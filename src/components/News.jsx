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
        props.actions.mainAction(ACTIONS.LOAD_POST_IMAGES,{})
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (<>
    <section className="news">
    <div className="container">
    <h2 style={{textAlign:'center',fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>News</h2>
    <Row>
        {Object.values(props.posts).map(article => {

          let articleImage =Object.values(props.postImages).filter(image => image.albumID == article.ID).map(image =>{
            return image
          })
          
            return <Article key={article._id} {...article} image={articleImage[0]} />

        })}
    </Row>
    <h3 style={{textAlign:'center',fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}><Link to="/">view all articles</Link></h3>
    </div>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
      posts:state.postsReducer,
      postImages:state.postImagesReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(News);
 