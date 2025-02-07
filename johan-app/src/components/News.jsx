import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import Article from "components/shared/Article";
import { Row } from "react-bootstrap";
const News = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.actions.mainAction(ACTIONS.LOAD_POSTS, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="news">
        <div className="container">
          <Row className="news-items">
            {Object.values(props.posts).map((article, i) => {
              return <Article key={i} {...article} history={props.history} />;
            })}
          </Row>
        </div>
      </section>
    </>
  );
};
function mapStateToProps(state) {
  return {
    posts: state.postsReducer,
    postImages: state.postImagesReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ mainAction }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
