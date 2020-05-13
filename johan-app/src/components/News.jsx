import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
import Article from "components/shared/Article"
import {Row} from "react-bootstrap"
import _ from "lodash"
import { db } from "../firebase";
const News  = (props) => {
    useEffect(() => {
      
        props.actions.mainAction(ACTIONS.LOAD_POSTS,[])
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (<>
    {/* <section className="news">
    <div className="container">
    <Row className="d-flex justify-content-center">
        {Object.values(props.posts).map(article => {
            return <Article key={article._id} {...article} history={props.history} />
        })}
    </Row>
    </div>
    </section> */}
    <section class="news"><div class="container"><div class="d-flex justify-content-center row"><div class="col-lg-6"><div class="news-card"><div class="card-image"  style={{"height": "180px", overflow: "hidden", width: "120px"}}><a href="/post/5ea499b423849113c077fd4a"><img src="/images/posts/1587851878700-No. 5 JPEG.jpg" width="100%" max-height="180px" /></a></div><div class="card-body"><div class="card-date">October 08 2019</div><div class="card-title">Symphony No. 5 Return  to Middle Earth publishe...</div><div class="card-text">Amstel Music proudly announces the release of Johan de Meij’s Symphony...</div><div class="card-link"><a href="/post/5ea499b423849113c077fd4a">More...</a></div></div></div></div><div class="col-lg-6"><div class="news-card"><div class="card-image"  style={{"height": "180px", overflow: "hidden", width: "120px"}}><a href="/post/5e8babe09eede4307d9f256f"><img src="/images/posts/LotR-Cover 30 HR.jpg" width="100%" max-height="180px" /></a></div><div class="card-body"><div class="card-date">June 05 2018</div><div class="card-title">30 YEARS Symphony No. 1 THE LORD OF THE RINGS</div><div class="card-text"></div><div class="card-link"><a href="/post/5e8babe09eede4307d9f256f">More...</a></div></div></div></div><div class="col-lg-6"><div class="news-card"><div class="card-image"  style={{"height": "180px", overflow: "hidden", width: "120px"}}><a href="/post/5e8babe09eede4307d9f256d"><img src="/images/posts/20170306_Buma Awards_Johan de Meij.jpg" width="100%" max-height="180px" /></a></div><div class="card-body"><div class="card-date">March 09 2017</div><div class="card-title">BUMA Classical Award for Johan de Meij</div><div class="card-text">Dutch composer and conductor Johan de Meij is the recipient of the BUM...</div><div class="card-link"><a href="/post/5e8babe09eede4307d9f256d">More...</a></div></div></div></div><div class="col-lg-6"><div class="news-card"><div class="card-image"  style={{"height": "180px", overflow: "hidden", width: "120px"}}><a href="/post/5e8babe09eede4307d9f2570"><img src="/images/posts/Planet Earth cover LR.jpg" width="100%" max-height="180px" /></a></div><div class="card-body"><div class="card-date">February 03 2017</div><div class="card-title">PLANET EARTH SYMPHONY FILM ANNOUNCED</div><div class="card-text">Contribute your nature video and be a part of breakthrough film to acc...</div><div class="card-link"><a href="/post/5e8babe09eede4307d9f2570">More...</a></div></div></div></div><div class="col-lg-6"><div class="news-card"><div class="card-image"  style={{"height": "180px", overflow: "hidden", width: "120px"}}><a href="/post/5e8babe09eede4307d9f256c"><img src="/images/posts/SONY DSC                       .JPG" width="100%" max-height="180px" /></a></div><div class="card-body"><div class="card-date">September 26 2014</div><div class="card-title">Kyushu Wind Orchestra appoints Johan de Meij as...</div><div class="card-text">The Kyushu Wind Orchestra from Fukuoka - Japan has officially appointe...</div><div class="card-link"><a href="/post/5e8babe09eede4307d9f256c">More...</a></div></div></div></div></div></div></section>
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
 