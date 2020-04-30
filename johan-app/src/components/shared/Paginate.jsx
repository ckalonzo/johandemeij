import React,{useState} from "react";
import Pagination from 'react-bootstrap/Pagination'
import {Row,Col} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"

const Paginate = (props) => {
    const [currentPage,setCurrentPage] = useState(0)
    const loadAgendas = (limit,skip) => {
        window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS[props.action],{limit,skip})
    }
    
    const renderPageItems = () => {
        let totalPages = Object.keys(props.items).length
        let pages = parseInt(totalPages / props.limit);
        const Items = []
        for (let i = 0; i < pages; i++) {
           
            let skip = i * parseInt(props.limit,10)
            let limit = i * parseInt(props.limit,10)+10

            Items.push(<Pagination.Item  className={i === currentPage ? "active-page":"page"} onClick={()=>{loadAgendas(limit,skip);setCurrentPage(i)}}>{i+1}</Pagination.Item> )
        }
        return Items
    }
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