import React,{useState,useEffect} from 'react'
import { Form,  Row, Col, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions"
import dayjs from "dayjs"
const PresentationMusicUpload = (props) => {
    const [file,setFile] = useState(null)
    const [selectedFile,setSelectedFile] = useState()
    const [fileUrl,setFileUrl] = useState(null)
    let d = new Date()
    const [id, setId] = useState(dayjs(d).format('YYYYMMDDHHmmss'));
    useEffect(() => {
        props.actions.mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC, props.ID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    const onFormSubmit = (e) =>{
        e.preventDefault() // Stop form submit

        fileUpload()
    }
    const onChange = (e) => {
        setFile(e.target.files[0])
        setFileUrl(window.URL.createObjectURL(e.target.files[0]))
        setSelectedFile(e.target.files[0].name)
        console.log(e.target.files[0].name)
    }
    const fileUpload =()=>{
        let mp3File = {
            id,
            file,
            fileurl:fileUrl,
            pres_id:props.ID
        }
        props.actions.mainAction(ACTIONS.CREATE_PUBLICATION_MUSIC,mp3File)
        //props.history.push('/dashboard/publications/edit/'+props.ID)
    }
    const deleteMusic = (ID,NAME) => {
        props.actions.mainAction(ACTIONS.DELETE_PUBLICATION_MUSIC,{ID,name:NAME})
    }
    const renderMusicTracks = (props) => {
      // console.log(props)
       return  Object.values(props ? props.music : [] ).map(track=>{
            return (<><tr key={track.id}>
                <td>
             <figcaption>{`Listen to ${track.musicName}`}</figcaption>
             <audio
                 controls
                 src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/music%2F${track.musicName}?alt=media`}>
                     Your browser does not support the
                     <code>audio</code> element.
             </audio>
         </td>
         <td><Button onClick={()=>deleteMusic(track.id,track.musicName)}>Delete</Button></td>
         </tr>
                </>)
        })
       
    }
    const selecteImageToUpload = (e) => {
        e.preventDefault()
        document.querySelector('input#mp3-file').click()
    }
    return (
        <section id="music">
            <Form >

                <Row>
                <Col lg={{span:3,offset: Object.values(props.music).length  > 0 ? 0:3}}>
                        
                        <Button  variant="outline-secondary" style={{marginRight:"10px",marginBottom:"15px"}} onClick={(e)=>selecteImageToUpload(e)}>choose a file</Button> {selectedFile}
                        <input type="file" id="mp3-file" onChange={(e)=>onChange(e)} />
                    </Col>
                    <Col lg={3}>
                        <Button onClick={(e)=>fileUpload(e)}>Add music</Button>
                    </Col>
                    
                {Object.values(props.music).length > 0 ? <Col lg={3}><Table striped bordered hover>
  <thead>
    <tr>
      <th colSpan="2">music</th>
      
    </tr>
  </thead>
  <tbody>
      {renderMusicTracks(props)}
  </tbody>
</Table></Col> : ""}
                
                </Row>
            </Form>
            <Row style={{marginTop:"15px"}}>
                
            </Row>
        </section>
   )
}


function mapStateToProps(state) {
    
    return {
      music:state.presentationMusicReducer
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ mainAction }, dispatch)
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PresentationMusicUpload);
