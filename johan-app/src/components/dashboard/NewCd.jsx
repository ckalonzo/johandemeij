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
import PublicationImage from "components/dashboard/PublicationImage"
const NewCd = props => {
  const [validated, setValidated] = useState(false);
  const [field_cdName,setCdName] = useState()
  const [field_subTitle,setSubTitle] = useState()
  const [field_composer,setComposer] = useState()
  const [field_instrumentation,setInstrumentation] = useState()
  const [field_synopsis,setSynopsis] = useState()
  const [field_totalTime,setTotalTime] = useState()
//   const [field_frontCover,setFrontCover] = useState()
//   const [field_backCover,setBackCover] = useState()
//   const [field_frontCaption,setFrontCaption] = useState()
//   const [field_backCaption,setBackCaption] = useState()
  const [field_category,setCategory] = useState()
  const [field_codes,setCodes] = useState()
  const [field_duration,setDuration] = useState()
  const [field_grade,setGrade] = useState()
  const [field_cd,setCd] = useState()
  const [field_otherCd,setOtherCd] = useState()
  const [field_score,setScore] = useState()
  const [field_audio,setAudio] = useState()
  const [field_video,setVideo] = useState()


  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,[])
   let publicationId = props.match.params.id
    if(publicationId)
    props.actions.mainAction(ACTIONS.LOAD_PRESENTATION,publicationId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    let testArray = []
    let lastItem = props.allPresentations.map((item,i) =>{
       
        return testArray.push({id:parseInt(item.id,10)})
    })
    console.log(_.orderBy(testArray,'id','desc')[0].id)
    
    let cdItem = {
        id:(_.orderBy(testArray,'id','desc')[0].id + 1),
        cdName:field_cdName,
        subTitle:field_subTitle,
        composer:field_composer,
        instrumentation:field_instrumentation,
        synopsis:field_synopsis,
        totalTime:field_totalTime,
        // frontCover:field_frontCover,
        // backCover:field_backCover,
        // frontCaption:field_frontCaption,
        // backCaption:field_backCaption,
        category:field_category,
        codes:field_codes,
        duration:field_duration,
        grade:field_grade,
        cd:field_cd,
        otherCd:field_otherCd,
        score:field_score,
        audio:field_audio,
        video:field_video
        
    }
    console.log(cdItem)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    props.actions.mainAction(ACTIONS.CREATE_NEW_PUBLICATION,cdItem)
    props.history.push('/dashboard/publications/edit/'+(_.orderBy(testArray,'id','desc')[0].id + 1))
  };
  const handleUpdate = async event => {
    event.preventDefault();
    let cdItem = {
        _id:props.presentation._id,
        cdName:document.getElementById('cdName').value,
        subTitle:document.getElementById('subtitle').value,
        composer:document.getElementById('composer').value,
        instrumentation:document.getElementById('instrumentation').value,
        synopsis:field_synopsis,
        totalTime:document.getElementById('totalTime').value,
        category:document.getElementById('category').value,
        codes:document.getElementById('codes').value,
        duration:document.getElementById('duration').value,
        grade:document.getElementById('grade').value,
        cd:document.getElementById('cd').value,
        otherCd:document.getElementById('otherCD').value,
        score:document.getElementById('score').value,
        audio:document.getElementById('audio').value,
        video:document.getElementById('video').value
        
    }
    var input = document.querySelector("form:first-child input");
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(input, "is working");

    var inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    await props.actions.mainAction(ACTIONS.UPDATE_PUBLICATION,cdItem)
    window.location.reload();
  }
  const renderPublicationImage = () => {
      return (<>
      <PublicationImage ID={props.presentation._id} image={props.presentation.frontCover} caption={props.presentation.frontCaption} type="front" />
          <PublicationImage ID={props.presentation._id} image={props.presentation.backCover} caption={props.presentation.backCaption} type="back" />
      </>)
  }
  return (
    <>
      <Container>
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
          
          {Object.keys(props.presentation).length > 0 ? renderPublicationImage():''}
            <section id="product">
              <Form noValidate validated={validated} onSubmit={Object.keys(props.presentation).length > 0 ?handleUpdate :handleSubmit}>
              <Form.Row><Col lg="6">
                  <Form.Group as={Col}  controlId="cdName">
                     <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.cdName}
                      onChange={e => setCdName(e.target.value)}
                      onBlur={e => setCdName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a name.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     
                    
                  </Form.Group> </Col>
                 <Col lg="6">
                  <Form.Group as={Col}   controlId="subtitle">
                  <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.subTitle}
                      onChange={e => setSubTitle(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Sub title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    
                    
                  </Form.Group></Col>
                  </Form.Row> <Form.Row>
                  <Col lg="6"><Form.Group as={Col}  controlId="composer">
                    <Form.Label>Composer</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.composer}
                      onChange={e => setComposer(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a composer.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  <Col lg="6"> <Form.Group as={Col}  controlId="instrumentation">
                    <Form.Label>Instrumentaion</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.instrumentation}
                      onChange={e => setInstrumentation(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a instrumentaion.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  </Form.Row>
                <Form.Row>
                <Col lg="6"><Form.Group as={Col} controlId="totalTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.totalTime}
                      onChange={e => setTotalTime(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product time.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col> 
                <Col lg="6"><Form.Group as={Col} controlId="codes">
                    <Form.Label>codes</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.codes}
                      onChange={e => setCodes(e.target.value)}
                      onBlur={e => setCodes(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product description.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                <Col lg="6"><Form.Group as={Col} controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.duration}
                      onChange={e => setDuration(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a duration.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                <Col lg="6"><Form.Group as={Col} controlId="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.grade}
                      onChange={e => setGrade(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a grade.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                <Col lg="6"> <Form.Group as={Col} controlId="cd">
                    <Form.Label>CD</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.cd}
                      onChange={e => setCd(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a CD.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                <Col lg="6"><Form.Group as={Col} controlId="otherCD">
                    <Form.Label>otherCD</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.otherCd}
                      onChange={e => setOtherCd(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a cd.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>

                </Form.Row>
                <Form.Row>
                <Col lg="6"><Form.Group as={Col} controlId="score">
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.score}
                      onChange={e => setScore(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a score.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                <Col lg="6"><Form.Group as={Col} controlId="audio">
                    <Form.Label>Audio</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.presentation.audio}
                      onChange={e => setAudio(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide audo.
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
                      value={props.presentation.category}
                    >
                    {props.presentation.category > 0 ? <option value={props.presentation.category}>{props.categories.filter(category => category.id === parseInt(props.presentation.category,10)).map(category => category.name)}</option> : ""}
                    {props.categories.map(category=>{
                        return <option value={category.id}>{category.name}</option>
                    })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a video.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                    <Col lg="6"><Form.Group as={Col} controlId="video">
                    <Form.Label>Video</Form.Label>
                    <Form.Control
                      required
                      as="textarea" rows="3"
                      onChange={e => setVideo(e.target.value)}
                      defaultValue={props.presentation.video}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a video.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  
                  
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="content">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.presentation.synopsis ? props.presentation.synopsis: field_synopsis}
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
                  </Form.Row>
                <Button type="submit">{Object.keys(props.presentation).length > 0 ?"Update Publication" :"Create Publication"}</Button>
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
    presentation:state.presentationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCd);
