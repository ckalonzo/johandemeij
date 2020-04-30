import React from "react";
import Pagination from 'react-bootstrap/Pagination'
import {Row,Col} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"

const Paginate = (props) => {
    const loadAgendas = (limit,skip) => {
        window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS.LOAD_PRESENTATIONS,{limit,skip})
    }
    
    const renderPageItems = () => {
        let totalPages = Object.keys(props.items).length
        
        let pages = parseInt(totalPages / props.limit);
        console.log({total:totalPages,pages,limit:props.limit})
        
        const Items = []
        for (let i = 0; i < pages; i++) {
           
            let skip = i * parseInt(props.limit,10)
            let limit = i * parseInt(props.limit,10)+10
            console.log("limit:",limit,"skip:",skip)
            Items.push(<Pagination.Item   onClick={()=>loadAgendas(limit,skip)}>{i+1}</Pagination.Item> )
        }
        return Items
    }
    console.log(props)
    return(<Row>
        <Col style={{display:"table"}}>
          <div style={{margin:"50px auto",display:"table"}}>
        <Pagination >
        {renderPageItems()}
        {/* {<Pagination.Item disabled>{14}</Pagination.Item>} */}
        {/* {<Pagination.Ellipsis />} */}
        </Pagination></div>
        </Col>
        </Row>)
}
function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer
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
  )(Paginate);