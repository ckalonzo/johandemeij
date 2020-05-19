import React,{useEffect} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import { Container } from "react-bootstrap";
const Cds = (props) => {
    useEffect(() => {
        window.scrollTo(0,0)
       
       props.actions.mainAction(ACTIONS. LOAD_CDS,{})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const loadCdProfile = (id) => {
      props.history.push('/cd/profile/'+id)
    }
    console.log(props)
    return (<>
    <section className="cds">
        <ul>
        {Object.values(props.cds).map((cd)=>{
          console.log(cd)
            let styles={
                width:"100px",
            backgroundImage:`url(/images/music_catalogue/${cd.cdImage})`,
            backgroundSize:"contain",
            backgroundRepeat: "no-repeat",
            padding:"115px 0 0 0"
        }
            return <li key={cd.id} style={styles} onClick={()=>{loadCdProfile(cd.id)}}>
                <div className="title">{cd.cd_name}</div>
            </li>
        })}
        </ul>
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