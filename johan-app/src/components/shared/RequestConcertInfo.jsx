import React,{useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import { Container,Col,Row,Form,Button} from "react-bootstrap"
import dayjs from "dayjs"
const RequestConcertInfo = (props) => {
    const [orchestraEnsemble, setOrchestraEnsemble] = useState();
    const [conductor, setConductor] = useState();
    const [nameOfPiece, setNameOfPiece] = useState();
    const [location, setLocation] = useState();
    const [dateTime, setDateTime] = useState();
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        let d = new Date()
       
        let concertItem = {
          id:dayjs(d).format('YYYYMMDDHHmmss'),
            orchestraEnsemble,
            conductor,
            nameOfPiece,
            dateTime,
            location,
            status:"unread"
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
       props.actions.mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION,concertItem)
       setValidated(true);
        
      };
      const renderForm = () => {
        return (<>
            <section className="concert-info">
                <Container>
                    <Row className="text-center">
                        <Col>
                        <h4>SEND US YOUR CONCERT INFORMATION:</h4>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        
        <Form.Row>
          <Form.Group as={Col}  controlId="title">
          <Form.Control type="text" placeholder="Orchestra, Ensemble"  onChange={e => setOrchestraEnsemble(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please provide a title.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="conductor">
          <Form.Control type="text" placeholder="Conductor" onChange={e => setConductor(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please provide a product description.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} controlId="date">
          <Form.Control type="text" placeholder="Name of piece(s)"  onChange={e => setNameOfPiece(e.target.value)}/>
           
            <Form.Control.Feedback type="invalid">
                Please provide a product description.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
        </Form.Row>
        
        <Form.Row>
          <Form.Group as={Col} controlId="date-time">
          <Form.Control type="text" placeholder="Date, time"   onChange={e => setDateTime(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please provide a product description.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="location">
          <Form.Control type="text" placeholder="Location"   onChange={e => setLocation(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please provide a product location.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
        </Form.Row>
        <Button className="jdm-button" type="submit">Send</Button>
        </Form> 
                        </Col>
                    </Row>
                </Container>
            </section>
           </>)
      }
      const renderSubmitted = () => {
        return (<>
            <section className="concert-info">
                <Container>
                    <Row className="text-center">
                        <Col>
                        <h4>Your concert information has been submitted.
                        Thank you!</h4>
                        </Col>
                    </Row>
                </Container>
            </section>
           </>)
      }
   return !validated ? renderForm():renderSubmitted();
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
  )(RequestConcertInfo);