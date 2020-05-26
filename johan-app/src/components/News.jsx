import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import Article from "components/shared/Article"
import {Row,Col} from "react-bootstrap"
import RequestConcertInfo from "components/shared/RequestConcertInfo"
const News  = (props) => {
    useEffect(() => {     
      window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (<>
     <section className="news">
    <div className="container">
    <Row className="">
       {Object.values(props.posts).map(article => {
            return <Article key={article._id} {...article} history={props.history} />
        })}
    </Row>
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
 