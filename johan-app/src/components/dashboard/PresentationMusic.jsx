import React,{useState} from 'react'
import { Form, Container, Row, Col, Button } from "react-bootstrap";
const PresentationMusicUpload = () => {
    const [file,setFile] = useState(null)
 
  
    const onFormSubmit = (e) =>{
        e.preventDefault() // Stop form submit

        fileUpload(file).then((response)=>{
            console.log(response.data);
        })
    }
    const onChange = (e) => {
        setFile({file:e.target.files[0]})
    }
    const fileUpload =(file)=>{
        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        }
        return  //post(url, formData,config)
    }

    return (
        <section id="music">
            <Form onSubmit={()=>onFormSubmit()}>
                <Row>
                    <Col>
                        <h1>File Upload</h1>
                        <input type="file" onChange={(e)=>onChange(e)} />
                    </Col>
                    <Col>
                        <Button type="submit">Upload</Button>
                    </Col>
                </Row>
            </Form>
        </section>
   )
}



export default PresentationMusicUpload