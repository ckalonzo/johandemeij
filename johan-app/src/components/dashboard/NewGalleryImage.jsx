import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions"
import { Form, Row, Col, Button, Container} from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
const GalleryImage = (props) => {
  let mainProps = props
  
    const [selectedFile,setSelectedFile] = useState()
    const [uploadStatus,setUploadStatus] = useState(false)
    const [validated, setValidated] = useState(false);
    const [file,setFile] = useState()
 
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
        path:selectedFile
      }
       mainProps.actions.mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE,image)
      }

    const deleteGalleryImage = () => {
        let image = {
          docId:props.docId,
          name:props.image,
          id:props.ID,
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
        <Button variant="danger" onClick={()=>{if(window.confirm("Delete this item?"))deleteGalleryImage(_id)}} >Delete</Button>
        </>)
      }
      const renderInsertButtons = () => {
        if(selectedFile && uploadStatus){
        return <Button variant="warning" onClick={()=>uploadImage()}>upload</Button>
        } else {
           return (<>
           <Button variant="primary" style={{marginRight:"15px"}}onClick={(e)=>selecteImageToUpload(e)} >Change</Button>
           <Button variant="danger" onClick={(e)=>{if(window.confirm("Delete this item?"))deleteGalleryImage(e)}} >Delete</Button>
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
        return (<img  width="100%" height="100%" object-fit="contain" src={!selectedFile ? "https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F"+props.image+'?alt=media':selectedFile} onClick={(e)=>selecteImageToUpload(e)} />)
       } else {
        return (<img  width="100%" height="100%" object-fit="contain" src={!selectedFile ? "/images/missing.png":selectedFile} onClick={(e)=>selecteImageToUpload(e)} />)
       }

      }

    return(<>
        <Container className="dashboard">
        <Row>
          <Col lg={{ span: 2 }}><SideNav /></Col>
          <Col lg={{ span: "10" }}>
          <section id="images">
          <Form noValidate validated={validated} onSubmit={handleImageSubmit}>
            <Row>
            <Col lg={{span:6}} className="gallery-image">
             {renderImage()}
    <div style={{marginTop:"15px",textAlign:"center",font: "400 8px/10px 'Work Sans', sans-serif"}}>{!uploadStatus ? props.imageName:""}</div>
            </Col>
             <Col lg={{span:3}} className="caption">
             <div><Form.Row>
              <Form.Group controlId={props.type === "front" ? "frontCaption":"backCaption"}>
              <Form.Label>{props.type === "front" ? "Front Cover ":"Back Cover "}Caption</Form.Label>
              <Form.Control
                      required
                      type="text"
                      placeholder=""
                      defaultValue={props.caption}
                      //onChange={}
                    />
              </Form.Group>
            </Form.Row></div>
               </Col>
    <Col lg={{span:3}}  className="action-button">{renderInsertButtons()}{
props.type === "front" ?
<input type="file" id={"post-image-front"} onChange={(e)=>onChangeHandler(e)}/> :
<input type="file" id={"post-image-back"} onChange={(e)=>onChangeHandler(e)}/>
    }</Col>
               </Row>
            </Form>
          </section>
          </Col>
          </Row>
          </Container>
    </>)
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(GalleryImage);