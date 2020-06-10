import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import dayjs from "dayjs"
import _ from "lodash"

const NewMusicCatalogue = props => {
    let d = new Date()
    const [id, setId] = useState(dayjs(d).format('YYYYMMDDHHmmss'));
    const [_id, set_id] = useState("");
    const [catalogueNumber, setCatalogueNumber] = useState();
    const [composerArranger, setComposerArranger] = useState("");
    const [duration, setDuration] = useState("");
    const [instrumentation, setInstrumentation] = useState("");
    const [link, setLink] = useState("");
    const [priceInDollars, setPriceInDollars] = useState("");
    const [priceInEuros, setPriceInEuros] = useState("");
    const [title, setTitle] = useState("");
    const [validated, setValidated] = useState();
    

  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS,[])
    if(props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_CATALOGUE,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let catalogueOrder = {
        id,
        _id,
        catalogueNumber,
        composerArranger,
        duration,
        instrumentation,
        link,
        priceInDollars,
        priceInEuros,
        title

    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log(catalogueOrder)
   props.actions.mainAction(ACTIONS.CREATE_CATALOGUE,catalogueOrder)
   props.history.push('/dashboard/catalogue/'+props.lastItem)
  };
  
  const handleUpdate = event => {
    event.preventDefault();
    
    let catalogueOrder = {
        id:props.catalogue.id,
        catalogueNumber : document.getElementById("catalogueNumber").value,
        composerArranger : document.getElementById("composerArranger").value,
        duration : document.getElementById("duration").value,
        instrumentation :document.getElementById("instrumentation").value,
        link ,
        priceInDollars : document.getElementById("priceInDollars").value,
        priceInEuros : document.getElementById("priceInEuros").value,
        title : document.getElementById("title").value

    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.UPDATE_CATALOGUE,catalogueOrder)
   props.history.push('/dashboard/catalogue/'+id)
  };
  
  const getLastItem = () => {
    return
  }

  return (
    <> 
      <Container  className="dashboard">
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
            <section id="product">
              <Form noValidate validated={validated} onSubmit={props.match.params.id !== "new" ? handleUpdate:handleSubmit}>
              <Form.Row>
                    <Col lg="12">
                    <Form.Group as={Col}  controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={title ? title : props.catalogue.title}
                      onChange={e => setTitle(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                <Col lg="12"><Form.Group as={Col} controlId="cd">
                    <Form.Label>CD</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      onChange={e => setLink(e.target.value)}
                      onBlur={e => setLink(e.target.value)}
                      defaultValue={props.catalogue.link}
                    >
              {Object.values(_.orderBy(props.allPresentations ? props.allPresentations:[],"cdName","asc")).map(CD=>{
              if(CD.id === props.catalogue.link)
              return <option key={CD.id} value={CD.id} selected>{CD.cdName}</option>
              return <option key={CD.id} value={CD.id} >{CD.cdName}</option>
              })}
                        
                    </Form.Control>                    <Form.Control.Feedback type="invalid">
                        Please provide a CD.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="catalogueNumber">
                    <Form.Label>Catalogue #</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={catalogueNumber ? catalogueNumber:props.catalogue.catalogueNumber}
                      onChange={e => setCatalogueNumber(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="composerArranger">
                    <Form.Label>Composer</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={composerArranger ? composerArranger : props.catalogue.composerArranger}
                      onChange={e => setComposerArranger(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={duration ? duration: props.catalogue.duration}
                      onChange={e => setDuration(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="instrumentation">
                    <Form.Label>Instrumentation</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={instrumentation ? instrumentation : props.catalogue.instrumentation}
                      onChange={e => setInstrumentation(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="priceInDollars">
                    <Form.Label>Price In Dollars</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={priceInDollars ? priceInDollars : props.catalogue.priceInDollars}
                      onChange={e => setPriceInDollars(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="priceInEuros">
                    <Form.Label>Price In Euros</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={priceInEuros ? priceInEuros : props.catalogue.priceInEuros}
                      onChange={e => setPriceInEuros(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Button type="submit">{props.match.params.id !== "new" ? "Update Order":"Create Order"}</Button>
              </Form> 
            </section>
          </Col>
        </Row> 
      </Container>
    </>
  );
};
function mapStateToProps(state) {
    let lastItem = _.orderBy(state.postsReducer,'ID','desc').map((lastItem,i) =>{
        return i===0 ? lastItem.ID :""
    })
  return {
    allPresentations:_.orderBy(state.AllPresentationsReducer,"id","asc"),
    catalogue:state.catalogueReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMusicCatalogue);
