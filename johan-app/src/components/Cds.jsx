import React,{useEffect} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import { Link } from "react-router-dom"
import { Col,Row} from "react-bootstrap"
const Cds = (props) => {
    useEffect(() => {
        window.scrollTo(0,0)
       props.actions.mainAction(ACTIONS. LOAD_CDS,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadCdProfile = (id) => {
      props.history.push('/cd/profile/'+id)
    }
    return (<>
    <section className="cds">
      <Row>
        <Col>
        <ul>
        {Object.values(props.cds).map((cd)=>{
            let styles={
                width:"100px",
            backgroundImage:`url(https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/music_catalogue%2F${cd.cdImage}?alt=media)`,
            backgroundSize:"contain",
            backgroundRepeat: "no-repeat",
            padding:"115px 0 0 0"
        }
            return <li key={cd.id} style={styles} onClick={()=>{loadCdProfile(cd.id)}}>
                <div className="title"><Link to={`/cd/profile/${cd.id}`}>{cd.cd_name}</Link></div>
            </li>
        })}
        </ul>
        </Col>
      </Row>
        
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        cds:state.cdsReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
            mainAction
        },
        dispatch
      )
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cds);