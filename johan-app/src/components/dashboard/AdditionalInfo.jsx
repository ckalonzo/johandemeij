import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Table, Form, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import dayjs from "dayjs"
import _ from "lodash"
const AdditionalInfo = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        window.scrollTo(0,0)
        props.actions.mainAction(ACTIONS.LOAD_CD_INFO,props.cdId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const d = new Date()
      const newId= dayjs(d).format('YYYYMMDDHHmmss');
      const [status,setStatus] =  useState("")
      const [title,setTitle] = useState("")
      const [time,setTime] = useState("")
      const [grade,setGrade] = useState("")
      const [composer,setComposer] = useState("")
      const [addInfo,setAddInfo] = useState("")
      const [addNewInfo,setNewInfo] = useState(false)
      const [validated, setValidated] = useState(false);
      const handleSubmit = () => {
          return
      }
      const updateAdditionalInfo = (id,cdId) => {
          let infoItem = {
            id,
            grade:document.getElementById("grade").value,
            track_title:document.getElementById("title").value,
            composer:document.getElementById("composer").value,
            addInfo:document.getElementById("addInfo").value,
            cdId
          }
          props.actions.mainAction(ACTIONS.UPDATE_CD_INFO,infoItem)
      }
      const addAdditionalInfo = (cdId) => {
        let infoItem = {
          id:newId,
            grade:document.getElementById("grade").value,
            track_title:document.getElementById("title").value,
            composer:document.getElementById("composer").value,
            addInfo:document.getElementById("addInfo").value,
            cdId:props.match.params.id
        }
        props.actions.mainAction(ACTIONS.CREATE_CD_INFO,infoItem)
        setTimeout(()=>{ 
            window.location.reload()
           }, 1000);
    }
    const deleteCd = (id,cdId) => {
        props.actions.mainAction(ACTIONS.DELETE_CD_INFO,{id:id,cdId:props.match.params.id})
        setTimeout(()=>{ 
            window.location.reload()
           }, 1000);
       
    }
      const List = () => {
          const displayButtons = (id,whichButtonsToShow,cdId) => {
              if(whichButtonsToShow === "update")
              return(<><Button onClick={()=>setStatus("")} variant="secondary">CANCEL</Button> <Button eventKey={id} onClick={(e)=>{setStatus(e.target.attributes.getNamedItem('eventKey').value);updateAdditionalInfo(id,cdId)}} variant="primary">UPDATE</Button></>)
              if(whichButtonsToShow === "add")
              return(<><Button onClick={()=>setNewInfo(false)} variant="secondary">CANCEL</Button> <Button  onClick={()=>{addAdditionalInfo(cdId)}} variant="primary">ADD</Button></>)

              return(<><Button onClick={()=>{if(window.confirm("Delete this item?"))deleteCd(id)}} variant="danger">DEL</Button> <Button  eventKey={id} onClick={(e)=>{setStatus(e.target.attributes.getNamedItem('eventKey').value)}} variant="primary">EDIT</Button></>)
          }
          const ListItems = () =>{
              if(addNewInfo)
              return (<tr>
               <td> <Form.Group controlId="title"><Form.Control
                                        required
                                        as="select"
                                       // onChange={e => setTitle(e.target.value)}
                                       
                                        >
                                <option value="" >SELECT A CD</option>
                                {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map
                                (CD=>{
                                return <option key={CD.id} value={CD.id} >{CD.cdName}</option>
                                })}
                    </Form.Control><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="grade"><Form.Control
                                        type="text"
                                        size="sm"
                                        placeholder=""
                                        
                                       // onChange={e => setGrade(e.target.value)}
                                        
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="composer"><Form.Control
                                        as="textarea" rows="3"
                                        size="sm"
                                        placeholder=""
                                        
                                      //  onChange={e => setComposer(e.target.value)}
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="addInfo"><Form.Control
                                        type="textarea"
                                        size="sm"
                                        as="textarea" rows="3"
                                        placeholder=""
                                        
                                       // onChange={e => setAddInfo(e.target.value)}
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
              <td>{displayButtons("","add")}</td>
              </tr>)
              return Object.values(props.additionalInfo).map(info => {
              if(info.id !== status)
              return (<tr>
              <td>{info.title[0]}</td>
              <td>{info.grade}</td>
              <td>{info.composer}</td>
              <td>{info.addInfo}</td>
              <td>{displayButtons(info.id)}</td>
              </tr>)
                return (<tr className={info.id === status ? "active":""} key={info.id} >
                    <td> <Form.Group controlId="title"><Form.Control
                                        required
                                        as="select"
                                       // onChange={e => setTitle(e.target.value)}
                                        defaultValue={info.track_title}
                                        >
                                <option value="" >SELECT A CD</option>
                                {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map
                                (CD=>{
                                return +CD.id === +info.track_title ? <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
                                : <option key={CD.id} value={CD.id} >{CD.cdName}</option>
                                })}
                    </Form.Control><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="grade"><Form.Control
                                        type="text"
                                        size="sm"
                                        placeholder=""
                                        defaultValue={info.grade}
                                       // onChange={e => setGrade(e.target.value)}
                                        
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="composer"><Form.Control
                                        as="textarea" rows="3"
                                        size="sm"
                                        placeholder=""
                                        defaultValue={info.composer}
                                      //  onChange={e => setComposer(e.target.value)}
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td><Form.Group controlId="addInfo"><Form.Control
                                        type="textarea"
                                        size="sm"
                                        as="textarea" rows="3"
                                        placeholder=""
                                        defaultValue={info.addInfo}
                                       // onChange={e => setAddInfo(e.target.value)}
                                        /><Form.Control.Feedback>Looks good!</Form.Control.Feedback></Form.Group></td>
                    <td>{displayButtons(info.id,"update",info.cdId)}</td>
                    </tr>)
              })
              
          }
          return (
            <Form>
            <Table striped bordered hover className="additional-info">
           
            <thead>
              <tr>
                <th>title</th>
                <th>grade</th>
                <th>composer</th>
                <th>additional info</th>
                <th><Button  variant="primary" onClick={()=>setNewInfo(true)}>ADD INFO</Button></th>
              </tr>
            </thead>
            <tbody>
               <ListItems />
            </tbody>
            
          </Table>
          </Form>
          )
      }
      return (<>
        <List />
      </>)
}

function mapStateToProps(state) {
    
    return {
    allPresentations:_.orderBy(state.AllPresentationsReducer,"id","asc"),
      additionalInfo:state.cdInfoReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);
  