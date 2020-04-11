import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Container, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";

const ProfileImage = (props) => {
    const [selectedFile,setSelectedFile] = useState()
    const [uploadStatus,setUploadStatus] = useState(false)
    const [caption,setCaption] = useState(props.postImage.caption)
    const [disabled,setDisabled] = useState(false)
    const [validated, setValidated] = useState(false);
    const [file,setFile] = useState()
    const {ID,images} = props
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Johan De Meij | Edit Post`;
        
        //if(props.postImages)`
        //let image = Object.values(props.postImages).filter(postImage => postImage.albumID === ID)
        props.actions.mainAction(ACTIONS.LOAD_POST_IMAGE,{images,ID})
        if(ID){
            setDisabled(true)
            console.log("************",props.postImage.imageName)
            setSelectedFile(props.postImage.imageName)
         }
        setSelectedFile(props.postImage.imageName)
            console.log(props)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
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
        return <Button variant="primary" onClick={(e)=>selecteImageToUpload(e)} >change image</Button>
      }
      const selecteImageToUpload = (e) => {
        document.querySelector('input#post-image').click()
      }
    return(
        <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:4}} className="post-image">
              <img src={selectedFile ? "/images/posts/"+selectedFile :"/images/missing.png"}  onClick={(e)=>selecteImageToUpload(e)} />
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
               <Col lg={{span:4}}  className="action-button">{disabled ? renderUploadButtons():<Button variant="primary" disabled>change image</Button>}<input type="file" id="post-image" onChange={(e)=>onChangeHandler(e)}/></Col>
               </Row>
            </Form>
          </section>
    )
}
function mapStateToProps(state) {
    return {
      postImage:state.postImageReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);