import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PostImage from "components/dashboard/PostImage"

const EditPost = props => {
  const {_id,ID,postTitle,postDate,postContent,showPost,postImage} = props.post
  const [postStatus, setPostStatus] = useState(showPost);
  const [title, setTitle] = useState(postTitle);
  const [date, setDate] = useState(postDate);
  const [content, setContent] = useState(postContent);
  const [validated, setValidated] = useState(false);
  const [postImg,setPostImg] = useState(postImage)


  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_POST,props.match.params.id)
   // props.actions.mainAction(ACTIONS.LOAD_POST_IMAGES,{})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let newsItem = {
      _id,
      ID,
      showPost:postStatus ? postStatus:showPost,
      title:title?title:postTitle,
      date:date?date:postDate,
      content,
      postImage: postImg ? postImg : postImage
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.UPDATE_POST,newsItem)
   window.scrollTo(0,0)
  };
  
  console.log(props)
  return (
    <>
      <Container>
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
            {props.post.postImage ? <PostImage currentPost={props.match.params.id}{...props.post.postImage[0]}/>:""}
            <section id="product">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                            <Form.Group controlId="showpost">
                              <Form.Label>Show Post</Form.Label>
                              <Form.Control
                                as="select"
                                custom
                                onChange={e => setPostStatus(e.target.value)}
                              >
                                <option value={showPost}>{parseInt(showPost,10) === 1 ? "ON":"OFF"}</option>
                                <option value="1">ON</option>
                                <option value="2">OFF</option>
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
                  <Form.Group as={Col} controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={postDate}
                      onChange={e => setDate(e.target.value)}
                      
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
                        data={postContent ? postContent:content}
                        toolbar= {'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' }
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
    post: state.singlePostReducer,
    posts:state.postsReducer,
    postImages:state.postImagesReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
