import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import Article from "components/shared/Article"
import {Row} from "react-bootstrap"
import _ from "lodash"

const News  = (props) => {
    useEffect(() => {

        props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (<>
    <section className="news">
    <div className="container">
    <Row className="d-flex justify-content-center">
        {Object.values(props.posts).map(article => {
            return <Article key={article._id} {...article} />
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
 