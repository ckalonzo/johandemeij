import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Row, Col, Button} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";

const ProfileImage = (props) => {
  let mainProps = props
  
    const [selectedFile,setSelectedFile] = useState()
    const [uploadStatus,setUploadStatus] = useState(false)
    const [frontCaption,setFrontCaption] = useState()
    const [backCaption,setBackCaption] = useState()
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
        docId:props.docId,
        image:file,
        path:selectedFile,
        albumID:props.ID,
        caption:props.type === "front" ? frontCaption:backCaption,
        cover:props.type === "front" ? "frontCover":"backCover"
      }
       mainProps.actions.mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE,image)
      }
      
    const insertImage = () => {
    
      let image = {
        docId:props.docId,
        image:file,
        path:selectedFile,
        albumID:props.ID,
        caption:props.type === "front" ? frontCaption:backCaption,
        cover:props.type === "front" ? "frontCover":"backCover"
      }
       mainProps.actions.mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE,image)
      }
    const deletePresentationImage = () => {
        let image = {
          imageType:props.type === "front" ? "frontCover":"backCover",
          docId:props.docId,
          name:props.image,
          ID:props.ID,
        }

       mainProps.actions.mainAction(ACTIONS.DELETE_PRESENTATION_IMAGE,image)
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
        <Button variant="danger" onClick={()=>deletePresentationImage(_id)} >Delete</Button>
        </>)
      }
      const renderInsertButtons = () => {
        if(selectedFile && uploadStatus){
        return <Button variant="warning" onClick={()=>insertImage()}>upload</Button>
        } else {
           return (<>
           <Button variant="primary" style={{marginRight:"15px"}}onClick={(e)=>selecteImageToUpload(e)} >Change</Button>
           <Button variant="danger" onClick={(e)=>deletePresentationImage(e)} >Delete</Button>
           </>)
        }
       
      }
      const selecteImageToUpload = (e) => {
        props.type === "front" ?
        document.querySelector('input#post-image-front').click():
        document.querySelector('input#post-image-back').click()
      }
      let postImage = Object.values(props.postImage?props.postImage:[]).map(image => {
        return image
      })
      const renderImage = () => {
       if(props.image){
        return (<img src={!selectedFile ? "https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image+'?alt=media':selectedFile} onClick={(e)=>selecteImageToUpload(e)} />)
       } else {
        return (<img src="/images/missing.png" onClick={(e)=>selecteImageToUpload(e)} />)
       }

      }

    return(
        <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:2}} className="post-image">
             {renderImage()}
    <div style={{marginTop:"15px",textAlign:"center",font: "400 8px/10px 'Work Sans', sans-serif"}}>{!uploadStatus ? props.imageName:""}</div>
            </Col>
             <Col lg={{span:6}} className="caption">
             <div><Form.Row>
              <Form.Group controlId="showpost">
              <Form.Label>{props.type === "front" ? "Front Cover ":"Back Cover "}Caption</Form.Label>
              <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.caption}
                      onChange={e =>props.type === "front" ? setFrontCaption(e.target.value):setBackCaption(e.target.value)}
                    />
              </Form.Group>
            </Form.Row></div>
               </Col>
    <Col lg={{span:4}}  className="action-button">{props.imageName ? renderUploadButtons(props._id):renderInsertButtons()}{
props.type === "front" ?
<input type="file" id={"post-image-front"} onChange={(e)=>onChangeHandler(e)}/> :
<input type="file" id={"post-image-back"} onChange={(e)=>onChangeHandler(e)}/>
    }</Col>
               </Row>
            </Form>
          </section>
    )
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