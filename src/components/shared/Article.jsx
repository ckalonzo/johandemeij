import React from "react"
import {Col} from "react-bootstrap"
import {Link } from "react-router-dom"
const Article = () => {
    let styles = {
        backgroundImage:"url(http://69.13.153.9/images/posts/No.%205%20JPEG.jpg)",
        backgrounSize:"cover",
        height:"180px",
        borderRadius:"10px 10px 0 0",
        backgroundPosition:"50% 10%"
    }
    return (<>
    <Col lg={{span:"4" }}>
    <div className="news-card">
        <div className="card-image" style={styles}></div>
        <div className="card-body">
            <div className="card-title">Symphony No. 5 Return to Middle Earth published!</div>
            <div className="card-text">Amstel Music proudly announces the release of Johan de Meij’s Symphony No. 5 Return to Middle Earth.</div>
            <div className="card-link"><Link to="/">...more</Link></div>
        </div>
        </div>
    </Col>
    </>)
}
export default Article