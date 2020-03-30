import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button, InputGroup} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import Navbar from "components/dashboard/Navbar";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const EditPost = props => {
  const {postTitle,postDate,postContent} = props.post
  const [showPost, setShowPost] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [content, setContent] = useState();
  const [postImage, setPostImage] = useState();
  const [postImageCaption, setPostImageCaption] = useState();
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Johan De Meij | Edit Post`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    let product = {
      title,
      description,
      price,
      productType:type,
      productOwnerId: props.user._id
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log(ACTIONS.ADD_PRODUCT,product)
    if(Object.values(product).length > 0)
    props.actions.mainAction(ACTIONS.ADD_PRODUCT,product)
  };
  return (
    <>
      <Container>
    <Row>
    <Col lg={{ span: 2 }}>
            <SideNav />
          </Col>
        <Col lg={{span:"10" }}>
          <section id="product">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
                  <Form.Group controlId="showpost">
                    <Form.Label>Show Post</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      onChange={e => setShowPost(e.target.value)}
                    >
                      <option value="t">ON</option>
                      <option>Off</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
      <Form.Row>
        <Form.Group as={Col}  controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            defaultValue={postTitle}
            onChange={e => setTitle(e.target.value)}
            
          />
          <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} controlId="description">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            defaultValue={postDate}
            onChange={e => setDescription(e.target.value)}
            
          />
          <Form.Control.Feedback type="invalid">
              Please provide a product description.
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Form.Row>
      <Form.Row>
      
      <Form.Group as={Col} controlId="content">
         <CKEditor
                    editor={ ClassicEditor }
                    data={postContent}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        </Form.Group>
        </Form.Row>
        
      <Button type="submit">Update Product</Button>
    </Form> </section>
        </Col>
      </Row> 
    </Container>
    </>
  );
};
function mapStateToProps(state) {
  return {
    post: state.singlePostReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
