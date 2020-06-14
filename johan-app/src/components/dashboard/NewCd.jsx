import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from "lodash"
import CdImage from "components/dashboard/CdImage"
import AdditionalInfo from "components/dashboard/AdditionalInfo"
const NewCd = props => {
  const [validated, setValidated] = useState(false);
  const [field_cd_name,setcd_name] = useState(props.cd.cd_name)
  const [field_synopsis,setSynopsis] = useState(props.cd.synopsis)
  const [field_totalTime,setTotalTime] = useState(props.cd.totalTime)
  const [field_category,setCategory] = useState(props.cd.category)
  const [field_addInfo,setAddInfo] = useState(props.cd.add_info)

 let cdId = props.match.params.id

  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,[])
  
    if(cdId)
    props.actions.mainAction(ACTIONS.LOAD_CD,cdId)
    props.actions.mainAction(ACTIONS.LOAD_CDS,[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    let testArray = []
   
    let id = (+props.lastCdId[0].id+1).toString()
    let cdItem = {
        id,
        cd_name:field_cd_name,
        synopsis:field_synopsis,
        category:field_category,
        add_info:field_addInfo,
        totalTime:field_totalTime
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.CREATE_NEW_CD,cdItem)
    props.history.push('/dashboard/cds/edit/'+id)
   console.log(cdItem)
  };
  const handleUpdate = async event => {
    event.preventDefault();
    let cdItem = {
        _id:props.cd._id,
        cd_name:document.getElementById('cd_name').value,
        synopsis:field_synopsis,
        totalTime:document.getElementById('totalTime').value,
        category:document.getElementById('category').value,
        add_info:document.getElementById('add-info').value
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    props.actions.mainAction(ACTIONS.UPDATE_CD,cdItem)
  }
  const renderCdImage = () => {
      return (<>
<CdImage docId={props.cd._id} ID={props.cd.id} image={props.cd.cdImage}  caption="" type="main" />
<CdImage docId={props.cd._id} ID={props.cd.id} image={props.cd.frontCover} caption={props.cd.frontCaption} type="front" />
<CdImage docId={props.cd._id} ID={props.cd.id} image={props.cd.backCover} caption={props.cd.backCaption} type="back" />
      </>)
  }

  return (
    <>
      <Container className="dashboard">
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
          
          {Object.keys(props.cd).length > 0 ? renderCdImage():''}
            <section id="product">
              <Form noValidate validated={validated} onSubmit={Object.keys(props.cd).length > 0 ?handleUpdate :handleSubmit}>
              <Form.Row><Col lg="12">
                  <Form.Group as={Col}  controlId="cd_name">
                     <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.cd.cd_name}
                      onChange={e => setcd_name(e.target.value)}
                      onBlur={e => setcd_name(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a name.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  </Form.Row> 
                
                <Form.Row>
                    <Col lg="6"><Form.Group as={Col} controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      onChange={e => setCategory(e.target.value)}
                      onBlur={e => setCategory(e.target.value)}
                      defaultValue={props.cd.category}
                    >
                    {props.cd.category > 0 ? <option value={props.cd.category} selected>{props.categories.filter(category => category.id === parseInt(props.cd.category,10)).map(category => category.name)}</option> : ""}
                    {props.categories.map(category=>{
                        return <option value={category.id}>{category.name}</option>
                    })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a video.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                    <Col lg="6"><Form.Group as={Col} controlId="totalTime">
                    <Form.Label>Total Time</Form.Label>
                     <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.cd.totalTime}
                      onChange={e => setTotalTime(e.target.value)}
                      onBlur={e => setTotalTime(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a video.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  
                  
                </Form.Row>
                <Form.Row>
                    
                    <Col lg="12">
                  {cdId ? <AdditionalInfo cdId={cdId} match={props.match}/>:""}
                  </Col>
                  
                  
                </Form.Row>
                <Form.Row>
                  <Col>
                  <Form.Group as={Col} controlId="synopsis">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.cd.synopsis ? props.cd.synopsis: field_synopsis}
                        toolbar= {'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' }
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                           // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                           // console.log( { event, editor, data } );
                           setSynopsis(data)
                        } }
                        onBlur={ ( event, editor ) => {
                          const data = editor.getData();
                            console.log( 'Blur.', editor );
                            setSynopsis(data)
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                  </Form.Group>
                  </Col>
                  </Form.Row>
                <Button type="submit">{Object.keys(props.cd).length > 0 ?"Update CD" :"Create CD"}</Button>
              </Form> 
            </section>
          </Col>
        </Row> 
      </Container>
    </>
  );
};
function mapStateToProps(state) {
    
  return {
    allPresentations:state.AllPresentationsReducer,
    categories:state.musicReducer.categories,
    cd:state.cdReducer,
    allCds:state.cdsReducer,
    lastCdId:_.orderBy(state.cdsReducer,"id","desc").map((cd,i)=>{

      return i === 0 ? cd:""
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCd);
