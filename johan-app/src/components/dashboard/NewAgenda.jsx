import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from "components/shared/Loading"
import _ from "lodash"

const NewAgenda = props => {
  const [validated, setValidated] = useState(false);
  const [field_orchestra,setOrchestra] = useState(props.agenda?props.agenda.orchestra:"")
  const [field_conductor,setConductor] = useState(props.agenda?props.agenda.conductor:"")
  const [field_country,setCountry] = useState(props.agenda?props.agenda.countrt:"")
  const [field_synopsis,setSynopsis] = useState("")
  const [field_time,setTime] = useState(props.agenda?props.agenda.time:"")
  const [field_location,setlocation] = useState(props.agenda?props.agenda.location:"")
  const [field_cd,setCd] = useState(props.agenda.cd ? props.agenda.cd:"")
  const [field_cd1,setCd1] = useState(props.agenda.cd1?props.agenda.cd1:"")
  const [field_cd2,setCd2] = useState(props.agenda.cd2?props.agenda.cd2:"")
  const [field_cd3,setCd3] = useState(props.agenda.cd3?props.agenda.cd3:"")
  const [field_city,setCity] = useState(props.agenda?props.agenda.city:"")
  const [field_showAgenda,setShowAgenda] = useState(props.agenda ? props.agenda.ON_OFF:"")
  const [field_month,setMonth] = useState("12")
  const [field_day,setDay] = useState("12")
  const [field_year,setYear] = useState("2020")
  let lastId = _.orderBy(props.allAgendas,'id','desc')

  const id = lastId[0] ? (+lastId[0].id+11):""
  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,[])
    let agendaId = props.match.params.id.toString()
    if(agendaId)
    props.actions.mainAction(ACTIONS.LOAD_AGENDA,agendaId)
    if(!id)
    props.actions.mainAction(ACTIONS.LOAD_ALL_AGENDAS,"2020")
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
   
    let agendaItem = {
        id,
        conductor:field_conductor,
        orchestra:field_orchestra,
        synopsis:field_synopsis,
        time:field_time,
        country:field_country,
        location:field_location,
        cd:field_cd,
        cd1:field_cd1,
        cd2:field_cd2,
        cd3:field_cd3,
        city:field_city,
        ON_OFF:field_showAgenda ? field_showAgenda.toString():document.getElementById('showpost').value.toString(),
        month:field_month,
        day:field_day,
        year:field_year,
        date:`${field_month}-${field_day}-${field_year}`
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.CREATE_NEW_AGENDA,agendaItem)
   props.history.push('/dashboard/agenda/'+id)
   setTimeout(()=>{ 
    window.location.reload()
   }, 1);
  };
  const handleUpdate = async event => {
    event.preventDefault();
    let agendaItem = {
        id:props.agenda.id,
        conductor:document.getElementById('conductor').value,
        synopsis:field_synopsis,
        orchestra:document.getElementById('orchestra').value,
        time:document.getElementById('time').value,
        location:document.getElementById('location').value,
        country:document.getElementById('country').value,
        cd:document.getElementById('cd').value,
        cd1:document.getElementById('cd1').value,
        cd2:document.getElementById('cd2').value,
        cd3:document.getElementById('cd3').value,
        city:document.getElementById('city').value,
        ON_OFF:document.getElementById('showpost').value,
        month:document.getElementById('month').value,
        day:document.getElementById('day').value,
        year:document.getElementById('year').value,
        date:`${document.getElementById('month').value}-${document.getElementById('day').value}-${document.getElementById('year').value}`
    }
   const input = document.querySelector("form:first-child input");
   const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(input, "");

   const inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    props.actions.mainAction(ACTIONS.UPDATE_AGENDA,agendaItem)
    setTimeout(()=>{ 
      window.location.reload()
     }, 0);
  }
  const months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
  const renderMonths = () => {
   
   return months.map((month,i)=>{
      i=i+1;
    if(i === +field_month)
    return <option key={i} value={i} selected>{month}</option>
    return <option key={i} value={i}>{month}</option>
    })
  }
  console.log(props)
  return (
    <>
      <Container className="dashboard">
  
        <Row>
          <Col lg={{ span: 2 }}><SideNav /></Col>
          <Col lg={{span:"10" }}> 
            {props.agenda.ON_OFF || props.match.params.id ? <section id="product">
            <Form.Row><Col lg="6" style={{padding:"0 0 30px 20px"}}>{!props.agenda.ON_OFF ? `id:${id}`:""}</Col></Form.Row>
              <Form noValidate validated={validated} onSubmit={Object.keys(props.agenda ? props.agenda:[]).length > 0 ?handleUpdate :handleSubmit}>
              <Form.Row><Col lg="6"> 
                            <Form.Group as={Col} controlId="showpost">
                              <Form.Label>Show Agenda {field_showAgenda}</Form.Label>
                             
                              <Form.Control
                                as="select"
                                custom
                                onChange={e => setShowAgenda(e.target.value)}
                              >
                                <option value={props.agenda.ON_OFF}>{parseInt(props.agenda.ON_OFF,10) === 1 ? "ON":"OFF"}</option>
                                <option value="1">ON</option>
                                <option value="2">OFF</option>
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                        Agenda status update.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                  </Col>
                 <Col lg="6">
                  <Form.Group as={Col}   controlId="conductor">
                  <Form.Label>Conductor</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.conductor}
                      onChange={e => setConductor(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Sub title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    
                    
                  </Form.Group></Col>
                  </Form.Row> <Form.Row>
                  <Col lg="6"><Form.Group as={Col}  controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.location}
                      onChange={e => setlocation(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a location.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  <Col lg="6"> <Form.Group as={Col}  controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.country}
                      onChange={e => setCountry(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a instrumentaion.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                  </Form.Row>
                <Form.Row>
                <Col lg="6"><Form.Group as={Col}  controlId="orchestra">
                     <Form.Label>Orchestra</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.orchestra}
                      onChange={e => setOrchestra(e.target.value)}
                      onBlur={e => setOrchestra(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a name.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     
                    
                  </Form.Group> </Col> 
                <Col lg="6"><Form.Group as={Col} controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.time}
                      onChange={e => setTime(e.target.value)}
                      onBlur={e => setTime(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product description.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                
                    <Col lg={12}>
                    <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.agenda.city}
                      onChange={e => setCity(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a cd.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                <Col lg="12">
                <Form.Group as={Col} controlId="cd">
  <Form.Label>CD {props.agenda.cd}</Form.Label>

                    <Form.Control
                      required
                      as="select"
                      onChange={e => setCd(e.target.value)}
                      onBlur={e => setCd(e.target.value)}
                      defaultValue={props.agenda.cd}
                    >
              <option value="" >SELECT A CD</option>
              {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map
              (CD=>{
              return +CD.id === +props.agenda.cd ? <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
              : <option key={CD.id} value={CD.id} >{CD.cdName}</option>
              })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a CD.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                <Col lg="12">
                <Form.Group as={Col} controlId="cd1">
            <Form.Label>CD #1 {props.agenda.cd1}</Form.Label>

                    <Form.Control
                      required
                      as="select"
                      onChange={e => setCd1(e.target.value)}
                      onBlur={e => setCd1(e.target.value)}
                      defaultValue={props.agenda.cd1}
                    > 

              <option value="" >SELECT A CD</option>
              {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map
              (CD=>{
              return CD.id === props.agenda.cd1 ? <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
              : <option key={CD.id} value={CD.id} >{CD.cdName}</option>
              })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a CD #1.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                <Col lg="12">
                <Form.Group as={Col} controlId="cd2">
                    <Form.Label>CD #2</Form.Label>

                    <Form.Control
                      required
                      as="select"
                      onChange={e => setCd2(e.target.value)}
                      onBlur={e => setCd2(e.target.value)}
                      defaultValue={props.agenda.cd2}
                    >
                      <option value="" >SELECT A CD</option>
              {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map(CD=>{
              return CD.id === props.agenda.cd2 ? <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
              : <option key={CD.id} value={CD.id} >{CD.cdName}</option>
              })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a CD.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                <Col lg="12">
                <Form.Group as={Col} controlId="cd3">
                    <Form.Label>CD #3</Form.Label>

                    <Form.Control
                      required
                      as="select"
                      onChange={e => setCd3(e.target.value)}
                      onBlur={e => setCd3(e.target.value)}
                      defaultValue={props.agenda.cd3}
                    >
                     <option value="" >SELECT A CD</option>
              {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map(CD=>{
              return CD.id === props.agenda.cd3 ? <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
              : <option key={CD.id} value={CD.id} >{CD.cdName}</option>
              })}
                        
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please provide a CD.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={4}>
                  <Form.Group as={Col} controlId="month">
                  <Form.Label>Month</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      onChange={e => setMonth(e.target.value)}
                      onBlur={e => setMonth(e.target.value)}
                      value={props.agenda.month}
                    >
                    <option value=''>--Select Month--</option>
                    <option  value={props.agenda.month} selected>{months.map((month,i)=>{
                   
                    if(i === (+props.agenda.month -1))
                      return month
                    })}</option>
                    {renderMonths()}
                    </Form.Control>
                   
                  </Form.Group>
                  </Col>
                  <Col lg={4}>
                  <Form.Group as={Col} controlId="day">
                  <Form.Label>Day</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      onChange={e => setDay(e.target.value)}
                      onBlur={e => setDay(e.target.value)}
                      defaultValue={props.agenda.day}
                    >
                   <option>-- Day --</option>
                  <option value={props.agenda.day} selected>{props.agenda.day ? props.agenda.day.replace(/^0+/, ''):""}</option>
<option value="01">1</option>
<option value="02">2</option>
<option value="03">3</option>
<option value="04">4</option>
<option value="05">5</option>
<option value="06">6</option>
<option value="07">7</option>
<option value="08">8</option>
<option value="09">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
                    </Form.Control>
                   
                  </Form.Group>
                  </Col>
                  <Col lg={4}>
                  <Form.Group as={Col} controlId="year">
                  <Form.Label>Year</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      onChange={e => setYear(e.target.value)}
                      onBlur={e => setYear(e.target.value)}
                      defaultValue={props.agenda.year}
                    >
                   <option>-- Year --</option>
                   <option value={props.agenda.year} selected>{props.agenda.year}</option>
<option value="2020">2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
                    </Form.Control>
                   
                  </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={12}>
                  <Form.Group as={Col} controlId="synopsis">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.agenda.synopsis}
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
                        <Form.Row>
                        <Col lg={12}>
                          <Button type="submit">{Object.keys(props.agenda ? props.agenda:[] ).length > 0 ?"Update Agenda" :"Create Agenda"}</Button>
                          </Col>
                        </Form.Row>
              </Form> 
            </section> : <Loading />}
          </Col>
        </Row> 
      </Container>
    </>
  );
};
function mapStateToProps(state) {
    
  return {
    allPresentations:_.orderBy(state.AllPresentationsReducer,"id","asc"),
    categories:state.musicReducer.categories,
    presentation:state.presentationReducer,
    agenda:state.agendaReducer,
    allAgendas:state.AllAgendasReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAgenda);
