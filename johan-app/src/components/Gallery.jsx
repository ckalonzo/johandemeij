import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Carousel, { Modal, ModalGateway } from "react-images";
import ReactHtmlParser from "react-html-parser";
import Gallery from "react-photo-gallery";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import dayjs from "dayjs";
const PhotoGallery = (props) => {
  useEffect(() => {
    document.title = "JohanDeMeij.com | Home";
    props.actions.mainAction(ACTIONS.LOAD_GALLERY,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
let photos = {}
  return (<>
  <section className="photo-gallery">
    <div className="container">
      <div className="row">
      <div className="col-10 offset-1 text-center">
     {photos.length > 0 ? <Gallery {...photos} onClick={openLightbox} /> : ""}
      </div>
      </div>
    </div>
  </section>
  </>)
}

function mapStateToProps(state) {
  return {
    photos:state.galleryReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        mainAction,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
