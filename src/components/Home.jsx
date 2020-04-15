import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import News from "components/News"
import Agenda from "components/Agenda"
import About from "components/About"
//import { ACTIONS } from "redux/actions/types"
import { mainAction } from "redux/actions/index.actions"
const Home = (props) => {
   useEffect(() => { 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   return (<>
      <News history={props.history}/>
      <Agenda />
      <About />
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
 
 export default connect(mapStateToProps, mapDispatchToProps)(Home);
