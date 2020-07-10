import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Carousel, { Modal, ModalGateway } from "react-images";
import ReactHtmlParser from "react-html-parser";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import dayjs from "dayjs";
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
const PhotoGallery = (props) => {
  useEffect(() => {
    document.title = "JohanDeMeij.com | Home";
    //props.actions.mainAction(ACTIONS.LOAD_GALLERY,props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleOnDragStart = (e) => e.preventDefault()
  return (<>
  <section className="photo-gallery">
    <div className="container">
      <div className="row">
      <div className="col-10 offset-1 text-center">
        <h1>Gallery</h1>
      <AliceCarousel mouseTrackingEnabled>
      <img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage1.jpg?alt=media" width="100%" height="100%" object-fit="contain" onDragStart={handleOnDragStart} className="gallery-image" />
      <img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage2.jpg?alt=media" width="100%" height="100%" object-fit="contain"  onDragStart={handleOnDragStart} className="gallery-image" />
      <img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage3.jpg?alt=media" width="100%" height="100%" object-fit="contain"  onDragStart={handleOnDragStart} className="gallery-image" />
      <img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage4.jpg?alt=media" width="100%" height="100%" object-fit="contain"  onDragStart={handleOnDragStart} className="gallery-image" />
      <img src="https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage5.jpg?alt=media" width="100%" height="100%" object-fit="contain"  onDragStart={handleOnDragStart} className="gallery-image" />
    </AliceCarousel>
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
