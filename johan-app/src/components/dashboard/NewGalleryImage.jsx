import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from "redux/actions/index.actions";
import { Form, Row, Col, Button, Container,Table } from "react-bootstrap";
import { ACTIONS } from "redux/actions/types";
import SideNav from "components/dashboard/SideNav";
import ReactHtmlParser from 'react-html-parser';
import dayjs from "dayjs";
const GalleryImage = (props) => {
  let mainProps = props;
  let d = new Date();
  let id=dayjs(d).format("YYYYMMDDHHmmss");
  const [selectedFile, setSelectedFile] = useState();
  const [caption,setCaption] = useState("")
  const [uploadStatus, setUploadStatus] = useState(false);
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    document.title = `Johan De Meij | Edit Post`;
    props.actions.mainAction(ACTIONS.LOAD_GALLERY,{})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleImageSubmit = (e) => {
    // console.log(props)
  };

  const uploadImage = () => {
    let image = { name: file.name, id, caption, date: dayjs(d).format("YYYY-MM-DD"), path: selectedFile,file};
    mainProps.actions.mainAction(ACTIONS.INSERT_GALLERY_IMAGE, image);
    setSelectedFile("")
  };

  const deleteGalleryImage = (id,name) => {
   
    mainProps.actions.mainAction(ACTIONS.DELETE_GALLERY_IMAGE, {ID:id,name});
  };
  const onChangeHandler = (e) => {
    setSelectedFile(window.URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setUploadStatus(true);
    console.log(window.URL.createObjectURL(e.target.files[0]),e.target.files[0])
  };

  const selecteImageToUpload = (e) => {
    document.querySelector("input#gallery-image").click();
  };

  const renderImage = () => {

      return (<>
        <input
        type="file"
        id={"gallery-image"}
        onChange={(e) => onChangeHandler(e)}
      />
        <img
          width="150px"
          src={!selectedFile ? "/images/missing.png" : selectedFile}
          onClick={(e) => selecteImageToUpload(e)}
        />
      </>);
  };
const ImageList =()=>{
console.log(props)
  return Object.values(props.galleryImages).map(image=>{
    
    return(<>
      <tr>
        <td><img
              width="250px"
              object-fit="contain"
              src={"https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F" + image.name + "?alt=media"}
            /></td>
            <td><ul>
    <li>{image.date ? ReactHtmlParser("<span>Date created:</span> "+ dayjs(image.date).format("M/DD/YYYY") ) : ""}</li>
    <li>{image.name ? ReactHtmlParser("<span>Name:</span> "+image.name) : ""}</li>
    <li>{image.caption ? ReactHtmlParser("<span>Caption:</span> "+image.caption) : ""}</li>
    <li><Button
        variant="danger"
        size="lg" block
        onClick={(e) => deleteGalleryImage(image.id,image.name)} 
        >Delete
        </Button>
    </li>
    </ul></td>
      </tr>
      </>)
  })
}
  return (
    <>
      <Container className="dashboard">
        <Row>
          <Col lg={{ span: 2 }}>
            <SideNav />
          </Col>
          <Col lg={{ span: "10" }}>
            <section id="images">
              <Form
                noValidate
                validated={validated}
              >
                <Row>
                  <Col lg={{ span: 3 }} className="gallery-image">
                    {renderImage()}
                  </Col>
                  <Col lg={{ span: 6 }} className="caption">
                    <Form.Row>
                      Date: {dayjs(d).format("MMMM DD, YYYY")}
                      <Form.Group controlId={"backCaption"}>
                        <Form.Label>Caption</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder=""
                          defaultValue={props.caption}
                          onChange={(e)=>setCaption(e.target.value)}
                        />
                      </Form.Group>
                    </Form.Row>
                    
                  </Col>
                  <Col lg={{ span: 3 }}style={{display: "flex", justifyContent: "center",
  alignItems: "center"}} >
                    <div >
                      {selectedFile ?  <Button
                        variant="primary"
                        onClick={(e) => uploadImage(e)}
                      >
                        Upload new image
                      </Button>: <Button
                        variant="dark"
                        disabled
                      >
                        Upload new image
                      </Button>}
                      </div>
                  </Col>
                </Row>
              </Form>
              <Row>
              <Col className="gallery-images">
              <Table className="table table-hover">
              <thead >
                <tr>
                  <th scope="col" style={{ "textAlign": "center" }}>Image</th>
                  <th scope="col" style={{ "textAlign": "center" }}>info</th>
                  <th scope="col" style={{ "textAlign": "center" }}></th>
                </tr>
              </thead>
              <tbody>
               <ImageList />
              </tbody>
            </Table>
                    
                  </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};
function mapStateToProps(state) {
  return {
    galleryImages: state.galleryReducer.gallery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ mainAction }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImage);
