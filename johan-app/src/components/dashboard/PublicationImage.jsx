import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";

const PublicationImage = (props) => {
    const [selectedFile,setSelectedFile] = useState("/images/missing.png")
    const [selectedFile_2,setSelectedFile_2] = useState("/images/missing.png")
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
        _id:props.ID,
        image:file,
        caption,
        cover:props.type === "front" ? "frontCover":"backCover"
      }
      console.log(image)
      props.actions.mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE,image)
        // setUploadStatus(true)
      }
      
    const insertImage = () => {

      let image = {
        _id:props.ID,
        image:file,
        caption,
        cover:props.type === "front" ? "frontCover":"backCover"
      }
       props.actions.mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE,image)
      }
     
      const onChangeHandler = (e) => {
        setSelectedFile(window.URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setUploadStatus(true)
      } 
      const onSecondChangeHandler = (e) => {
        setSelectedFile_2(window.URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setUploadStatus(true)
      } 
    
      const renderUploadButtons = (_id) => {
        if(selectedFile && uploadStatus)
        return <Button variant="dark" onClick={()=>uploadImage()}>upload</Button>
        return (<>
        <Button variant="primary" onClick={(e)=>selecteImageToUpload(e)} >Change</Button>
        </>)
      }
      const renderInsertButtons = () => {
        if(selectedFile && uploadStatus)
        return <Button variant="warning" onClick={()=>insertImage()}>upload</Button>
        return <Button variant="primary" onClick={(e)=>selecteSecondImageToUpload(e)} >Insert image</Button>
      }

      const selecteImageToUpload = (e) => {
        document.querySelector('input#post-image').click()
      }
      const selecteSecondImageToUpload = (e) => {
        document.querySelector('input#post-image2').click()
      }
      let postImage = Object.values(props.postImage?props.postImage:[]).map(image => {
        return image
      })
    return(
        <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:2}} className="post-image">
             <img src={props.image ? "https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image+'?alt=media':props.type==="front"?selectedFile:selectedFile_2} onClick={(e)=>props.type==="front"?selecteImageToUpload(e):selecteSecondImageToUpload(e)}/>
    <div style={{marginTop:"15px",textAlign:"center",font: "400 8px/10px 'Work Sans', sans-serif"}}>{!uploadStatus ? props.imageName:""}</div>
            </Col>
             <Col lg={{span:6}} className="caption">
             <Form.Row>
                  <Form.Group as={Col}  controlId="caption">
    <Form.Label>{props.type === "front" ? "Front Cover ":"Back Cover "}Caption</Form.Label>
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
               <Col lg={{span:4}}  className="action-button">
                 {props.image  ? renderUploadButtons(props._id):renderInsertButtons()}<input type="file" id={props.type === "front"?"post-image":"post-image2"} onChange={(e)=>props.type==="front"?onChangeHandler(e):onSecondChangeHandler(e)}/>
                 </Col>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(PublicationImage);