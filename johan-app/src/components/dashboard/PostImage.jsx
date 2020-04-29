import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import _ from "lodash"

const ProfileImage = (props) => {
  let mainProps = props
  
    const [selectedFile,setSelectedFile] = useState("/images/missing.png")
    const [uploadStatus,setUploadStatus] = useState(false)
    const [caption,setCaption] = useState()
    const [disabled,setDisabled] = useState(true)
    const [validated, setValidated] = useState(false);
    const [coverLocation,setCoverLocation]= useState("frontCover")
    const [file,setFile] = useState()
   //const {ID,images} = props
    useEffect(() => {
        document.title = `Johan De Meij | Edit Post`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const handleImageSubmit = (e) => {
      console.log(props)
    }
    const uploadImage = () => {
    
      let image = {
        _id:props._id,
        image:file,
        albumID:props.albumID,
        caption,
        cover:coverLocation,
        updatedAt:Date.now()
      }
     
       mainProps.actions.mainAction(ACTIONS.UPLOAD_IMAGE,_.cloneDeep(image))
        // setUploadStatus(true)
      }
      
    const insertImage = () => {
    
      let image = {
        image:file,
        albumID:props.currentPost,
        caption,
        cover:coverLocation
      }
       mainProps.actions.mainAction(ACTIONS.UPLOAD_POST_IMAGE,image)
      }
      const deletePostImage = (id) => {
       mainProps.actions.mainAction(ACTIONS.DELETE_POST_IMAGE,{image:id,post:props.currentPost})
      } 
      const onChangeHandler = (e) => {
        setSelectedFile(window.URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setUploadStatus(true)
      } 
    
      const renderUploadButtons = (_id) => {
        if(selectedFile && uploadStatus)
        return <Button variant="dark" onClick={()=>uploadImage()}>upload</Button>
        return (<>
        <Button variant="primary" onClick={(e)=>selecteImageToUpload(e)} >Change</Button>
        <Button variant="danger" onClick={()=>deletePostImage(_id)} >Delete</Button>
        </>)
      }
      const renderInsertButtons = () => {
        if(selectedFile && uploadStatus)
        return <Button variant="warning" onClick={()=>insertImage()}>upload</Button>
        return <Button variant="primary" onClick={(e)=>selecteImageToUpload(e)} >Insert image</Button>
      }

      const selecteImageToUpload = (e) => {
        document.querySelector('input#post-image').click()
      }
      let postImage = Object.values(props.postImage?props.postImage:[]).map(image => {
        return image
      })
      //if(props.length > 0)
    return(
        <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:2}} className="post-image">
             <img src={props.postImage.postImage.length > 0 ? "/images/posts/"+props.imageName:selectedFile}  onClick={(e)=>selecteImageToUpload(e)} />
    <div style={{marginTop:"15px",textAlign:"center",font: "400 8px/10px 'Work Sans', sans-serif"}}>{!uploadStatus ? props.imageName:""}</div>
            </Col>
             <Col lg={{span:6}} className="caption">
             <div><Form.Row>
              <Form.Group controlId="showpost">
                <Form.Label>Front / back cover</Form.Label>
                <Form.Control as="select" custom onChange={e => setCoverLocation(e.target.value)}>
                  <option value={props.cover ? props.cover:"frontCover"}>{props.cover ? props.cover:"" ==="frontCover"? "Front Cover":"Back Cover"}</option>
                  <option value="frontCover">Front Cover</option>
                  <option value="backCover">Back Cover</option>
                </Form.Control>
              </Form.Group>
            </Form.Row></div>
             <Form.Row>
                  <Form.Group as={Col}  controlId="caption">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.caption ? props.caption:''}
                      onChange={e => setCaption(e.target.value)}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a caption.
                      </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
               </Col>
               <Col lg={{span:4}}  className="action-button">{props.postImage.postImage.length > 0 ? renderUploadButtons(props._id):renderInsertButtons()}<input type="file" id="post-image" onChange={(e)=>onChangeHandler(e)}/></Col>
               </Row>
            </Form>
          </section>
    )
    return (<><div>Loading</div></>)
}
function mapStateToProps(state) {
    return {
      postImage:state.singlePostReducer
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);