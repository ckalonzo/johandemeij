import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import { mainAction } from "redux/actions/index.actions"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const EditPost = props => {
  const {_id,ID,postTitle,postDate,postContent,showPost} = props.post
  const [postStatus, setPostStatus] = useState(showPost);
  const [title, setTitle] = useState(postTitle);
  const [date, setDate] = useState(postDate);
  const [content, setContent] = useState(postContent);
  const [validated, setValidated] = useState(false);
  const [selectedFile,setSelectedFile] = useState()
  const [uploadStatus,setUploadStatus] = useState(false)
  const [caption,setCaption] = useState(props.postImage.caption)
  const [file,setFile] = useState()

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_POST_IMAGES,[])
    //if(props.postImages)
    let image = Object.values(props.postImages).filter(postImage => postImage.albumID === ID)
    props.actions.mainAction(ACTIONS.LOAD_POST_IMAGE,{image,ID})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let newsItem = {
      _id,
      ID,
      showPost:postStatus,
      title,
      date,
      content
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   props.actions.mainAction(ACTIONS.UPDATE_POST,newsItem)
  };
  const renderPostImage = () =>{   
      return (
        <>
            <Col lg={{span:4}} className="post-image">
              <img src={selectedFile ? selectedFile :"/images/missing.png"}  onClick={(e)=>selecteImageToUpload(e)} />
            </Col>
             <Col lg={{span:4}} className="caption">
             <Form.Row>
                  <Form.Group as={Col}  controlId="caption">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={caption}
                      onChange={e => setCaption(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a caption.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
               </Col>
        </>
      )
  }
  const handleImageSubmit = (e) => {

  }
  const uploadImage = () => {
    props.actions.mainAction(ACTIONS.UPLOAD_IMAGE,file)
    setUploadStatus(true)
  }
  const onChangeHandler = (e) => {
    setSelectedFile(window.URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  } 

  const renderUploadButtons = () => {
    if(selectedFile && !uploadStatus)
    return <Button variant="dark" onClick={()=>uploadImage()}>upload</Button>
    return <Button variant="primary" onClick={(e)=>selecteImageToUpload(e)}>change image</Button>
  }
  const selecteImageToUpload = (e) => {
    document.querySelector('input#post-image').click()
  }
  return (
    <>
      <Container>
        <Row>
          
          <Col lg={{ span: 2 }}>
              <SideNav />
          </Col>
          <Col lg={{span:"10" }}> 
          <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            {renderPostImage()}
              
  <Col lg={{span:4}}  className="action-button">{renderUploadButtons()}<input type="file" id="post-image" onChange={(e)=>onChangeHandler(e)}/></Col>
            </Row>
            </Form>
          </section>
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
                                <option value={postStatus}>{postStatus === true ? "ON":"OFF"}</option>
                                <option value="true">ON</option>
                                <option value="false">OFF</option>
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
                        data={content}
                        toolbar= {'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' }
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
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
    postImages:state.postImagesReducer,
    postImage:state.postImageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
