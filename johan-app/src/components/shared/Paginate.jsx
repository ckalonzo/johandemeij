import React from "react";
import Pagination from 'react-bootstrap/Pagination'
import {Row,Col} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"

const Paginate = (props) => {
    const loadAgendas = (skip) => {
        window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:20,skip}) 
    }
    
    const renderPageItems = () => {
        let totalPages = props.agendas ? props.agendas.length:""
        let pages = parseInt(totalPages / 11);

       
        const Items = []
        for (let i = 0; i < 6; i++) {
           
            let pagesToSkip = i === 1 ? 0: parseInt(i * 20)
           if(i!==0)
            Items.push(<Pagination.Item  onClick={()=>loadAgendas(pagesToSkip)}>{i}</Pagination.Item> )
        }
        return Items
    }
    return(<Row>
        <Col lg={{span:3,offset:5}} style={{textAlign:"center"}}>
        <Pagination>
  
  {renderPageItems()}

 
  {/* {<Pagination.Item disabled>{14}</Pagination.Item>} */}

  {/* {<Pagination.Ellipsis />} */}
 
</Pagination>
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