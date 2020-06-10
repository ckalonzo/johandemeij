import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import dayjs from "dayjs"
import _ from "lodash"

const NewOrderLocation = props => {
    let d = new Date()
    const [id, setId] = useState(dayjs(d).format('YYYYMMDDHHmmss'));
    const [_id, set_id] = useState("");
    const [address, setAddress] = useState();
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [fax, setFax] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [subCountry, setSubCountry] = useState("");
    const [tel, setTel] = useState("");
    const [website, setWebsite] = useState("");
    const [validated, setValidated] = useState();
    

  useEffect(() => {
    // Update the document subCountry using the browser API
    window.scrollTo(0,0)
    document.subCountry = `Johan De Meij | Edit Location`;
    if(!props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_ORDER_LOCATIONS,[])
    if(props.match.params.id)
    props.actions.mainAction(ACTIONS.LOAD_ORDER_LOCATION,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let catalogueOrder = {
        id,
        _id,
        address,
        city,
        company,
        country,
        email,
        fax,
        state,
        zip,
        subCountry

    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

   props.actions.mainAction(ACTIONS.CREATE_ORDER_LOCATION,catalogueOrder)
   props.history.push('/dashboard/catalogue/'+id)
  };
  
  const handleUpdate = event => {
    event.preventDefault();
    
    let catalogueOrder = {
        id:props.catalogue.id,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        company : document.getElementById("company").value,
        country :document.getElementById("country").value,
        email:document.getElementById("email").value,
        fax : document.getElementById("fax").value,
        state : document.getElementById("state").value,
        subCountry : document.getElementById("subCountry").value,
        website : document.getElementById("website").value,
        zip : document.getElementById("zip").value,
        tel:document.getElementById("tel").value,
        subCountry: document.getElementById("subCountry").value

    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.UPDATE_ORDER_LOCATION,catalogueOrder)
   props.history.push('/dashboard/order/'+props.catalogue.id)
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
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={address ? address:props.catalogue.address}
                      onChange={e => setAddress(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={city ? city : props.catalogue.city}
                      onChange={e => setCity(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="4">
                    <Form.Group as={Col}  controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={state ? state: props.catalogue.state}
                      onChange={e => setState(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a company.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="4">
                    <Form.Group as={Col}  controlId="zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={zip ? zip : props.catalogue.zip}
                      onChange={e => setZip(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a country.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="4">
                    <Form.Group as={Col}  controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={country ? country : props.catalogue.country}
                      onChange={e => setCountry(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a country.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={company ? company: props.catalogue.company}
                      onChange={e => setCompany(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a company.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="subCountry">
                    <Form.Label>Sub Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={subCountry ? subCountry : props.catalogue.subCountry}
                      onChange={e => setSubCountry(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a country.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="fax">
                    <Form.Label>Fax</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={fax ? fax : props.catalogue.fax}
                      onChange={e => setFax(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={email ? email : props.catalogue.email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="tel">
                    <Form.Label>Tel</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={tel ? tel : props.catalogue.tel}
                      onChange={e => setTel(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                    <Col lg="6">
                    <Form.Group as={Col}  controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={website ? website : props.catalogue.website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a subCountry.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                </Form.Row>
                <Button type="submit">{props.match.params.id !== "new" ? "Update Location":"Create Location"}</Button>
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
    catalogue:state.orderReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderLocation);
