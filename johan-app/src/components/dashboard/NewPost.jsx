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
const EditPost = props => {
  const [postStatus, setPostStatus] = useState(2);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [content, setContent] = useState();
  const [validated, setValidated] = useState(false);
  const [postImg,setPostImg] = useState()
  const [lastTotal,setLastTotal] = useState(props.lastItem);


  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0,0)
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_DASHBOARD_POSTS,{})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    
    let newsItem = {
        ID:props.lastItem.toString(),
        postContent:content,
        postDate:date,
        postTitle:title,
        image:[],
        showPost:postStatus,
        dateCreated: Date.now()
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log(newsItem)
   props.actions.mainAction(ACTIONS.CREATE_NEW_POST,newsItem)
   props.history.push('/dashboard/news/edit/'+props.lastItem)
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                            <Form.Group controlId="showpost">
                              <Form.Label>Show Post</Form.Label>
                              <Form.Control
                                as="select"
                                custom
                                onChange={e => setPostStatus(e.target.value)}
                              ><option value="2">OFF</option>
                                <option value="1">ON</option>
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
                      //defaultValue={postTitle}
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
                      //defaultValue={postDate}
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
                <Button type="submit">Create Post</Button>
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
    post: state.singlePostReducer,
    posts:state.postsReducer,
    postImages:state.postImagesReducer,
    lastItem:parseInt(lastItem[0])+1
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({mainAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
