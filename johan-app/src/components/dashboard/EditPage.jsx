import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditPage = props => {
  const [id, setId] = useState(props.match.params.id);
  const [content, setContent] = useState(props.page.content);
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_PAGE,props.match.params.id)
   // window.location.reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let eventItem = {
     id,
     content
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.UPDATE_PAGE,eventItem)
   window.scrollTo(0,0)
  };
  console.log(props)
  return (
    <>
      <Container className="dashboard">
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
            <section id="product">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="content">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={props.page ? props.page.content:content}
                        toolbar= {'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList','blockQuote' }
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                           // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                           // console.log( { event, editor, data } );
                            setContent(data)
                        } }
                        onBlur={ ( event, editor ) => {
                          const data = editor.getData();
                            console.log( 'Blur.', editor );
                            setContent(data)
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                  </Form.Group>
                  </Form.Row>
                <Button type="submit">Update</Button>
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
    page:state.pageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
