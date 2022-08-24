import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";

const ProfileImage = (props) => {
  let mainProps = props
  
    const [selectedFile,setSelectedFile] = useState("/images/missing.png")
    const [uploadStatus,setUploadStatus] = useState(false)
    const [caption,setCaption] = useState()
    const [validated, setValidated] = useState(false);
    const [coverLocation,setCoverLocation]= useState("frontCover")
    const [file,setFile] = useState()
   //const {ID,images} = props
    useEffect(() => {
        document.title = `Johan De Meij | Edit Post`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const handleImageSubmit = (e) => {
     // console.log(props)
    }
    const uploadImage = () => {
    
      let image = {
        image:file,
        path:selectedFile,
        albumID:props.currentPost,
        caption:caption ? caption:"",
        cover:coverLocation
      }
     console.log(image)
     //  mainProps.actions.mainAction(ACTIONS.UPLOAD_IMAGE,_.cloneDeep(image))
        // setUploadStatus(true)
      }
      
    const insertImage = () => {
    
      let image = {
        image:file,
        path:selectedFile,
        albumID:props.currentPost,
        caption,
        cover:coverLocation
      }
     // console.log(image)
       mainProps.actions.mainAction(ACTIONS.UPLOAD_POST_IMAGE,image)
       setTimeout(()=>{
        window.location.reload()
       },1000)
      }
      const deletePostImage = () => {
        let image = {
          name:props.postImage.image[0].imageName,
          ID:props.postImage.image[0].albumID,
        }

       mainProps.actions.mainAction(ACTIONS.DELETE_POST_IMAGE,image)
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
    return(
        <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:2}} className="post-image">
             <img src={props.imageName ? "https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.imageName+'?alt=media':selectedFile}  onClick={(e)=>selecteImageToUpload(e)} />
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
               <Col lg={{span:4}}  className="action-button">{props.imageName ? renderUploadButtons(props._id):renderInsertButtons()}<input type="file" id="post-image" onChange={(e)=>onChangeHandler(e)}/></Col>
               </Row>
            </Form>
          </section>
    )
    return (<><div>Loading</div></>)
}
function mapStateToProps(state) {
    return {
      postImage:state.singlePostReducer,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({mainAction}, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);