import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import { Row, Container, Col } from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser';
import { loadfilteredAgendas } from "API/indexAPI";

const MusicProfile = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "JohanDeMeij.com | Music Profile"
        props.actions.mainAction(ACTIONS.LOAD_PRESENTATIONS, {})
        props.actions.mainAction(ACTIONS.LOAD_MUSIC, {})
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE, props.match.params.id)
        props.actions.mainAction(ACTIONS.LOAD_CDS, {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadProfile = (profile) => {
        props.actions.mainAction(ACTIONS.LOAD_MUSIC_PROFILE, profile)
    }

    const CleanUpSynopsis = (text) => {
        return text.replace(/(\r\n|\n|\r)/gm, "")
    }
    const renderImage = (image, caption) => {
        return (<>
            <Row style={{margin: "0 0 15px 0" }}>
                <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/posts%2F${image}?alt=media`} style={{ maxWidth: "350px" }} alt="media" />
                <div style={{ fontSize: ".9rem", margin: "15px 0" }}>{caption}</div>
            </Row>
        </>)
    }

    const renderCdTitle = (ID) => {
        let title = Object.values(props.allCds).filter(cd => cd.id === ID)
        let titleObject = { ...title }
        return titleObject[0] ? titleObject[0].cd_name : ""
    }


    const renderProfile = () => {
        return (<>{renderCdTitle()}
            <section className="music-profile" style={{ marginTop: "50px" }}>
                <Container>
                    <Row>
                        <Col lg={{ span: 8 }}>
                            <h1>{props.profile.cdName}</h1>
                            <h3>{props.profile.subTitle}</h3>
                            <h5>{`Composer: ${props.profile.composer}`}</h5>
                            <p>{ReactHtmlParser(props.profile.synopsis ? CleanUpSynopsis(props.profile.synopsis) : "props.profile.synopsis")}</p>
                        </Col>
                        <Col lg={{ span: 4 }}>
                            {props.profile.frontCover ? renderImage(props.profile.frontCover, props.profile.frontCaption) : ""}
                            {props.profile.backCover ? renderImage(props.profile.backCover, props.profile.backCaption) : ""}
                            <Row>
                                <div className="details">
                                    <h2>Details</h2>
                                    <ul>
                                        {props.profile.totalTime ? <li><span>Duration:</span>  {ReactHtmlParser(props.profile.totalTime)}</li> : ""}
                                        {props.profile.instrumentation ? <li><span>Instrumentation:</span>  {ReactHtmlParser(props.profile.instrumentation)}</li> : ""}
                                        {renderCdTitle(props.profile.cd) ? <li><span>Cd:</span>  <a href={"/cd/profile/" + props.profile.cd}>{renderCdTitle(props.profile.cd)}</a></li> : ""}
                                        {props.profile.otherCd ? <li><span>Cd:</span>  <a href={"/cd/profile/" + props.profile.otherCd}>{renderCdTitle(props.profile.otherCd)}</a></li> : ""}
                                        {props.profile.codes ? <li><span>Catalogue/Order number:</span>  {ReactHtmlParser(props.profile.codes)}</li> : ""}
                                    </ul>
                                </div>
                            </Row>
                            <Row>
                                <div className="video">
                                    {ReactHtmlParser(props.profile.video)}
                                </div>
                            </Row>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>)
    }
    return (<>
        {props.profile ? renderProfile() : <div style={{ margin: "100px", textAlign: "center" }}><Container>Loading...</Container></div>}
    </>)
}
function mapStateToProps(state) {
    return {
        profile: state.musicProfileReducer,
        allPresentations: state.musicReducer.allPresentations,
        allCds: state.cdsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                mainAction
            },
            dispatch
        )
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicProfile);