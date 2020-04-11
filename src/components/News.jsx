import React from "react";
import Article from "components/shared/Article"
import {Row} from "react-bootstrap"
const News  = () => {
    return (<>
    <section className="news">
    <h2 style={{textAlign:'center',fontSize:"3rem",textTransform: "uppercase",color:"#FFF"}}>News</h2>
    <Row>
        <Article />
        <Article />
        <Article />
    </Row>
    </section>
    </>)
}
export default News