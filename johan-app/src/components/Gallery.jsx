import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import dayjs from "dayjs";
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
const PhotoGallery = (props) => {
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const [ items, setItems ] = useState([1,2,3,4,5])
  const slideTo = (i) => setCurrentIndex({ currentIndex: i });
  const slideNext = () => setCurrentIndex({ currentIndex: currentIndex + 1});
  const slidePrev = () => setCurrentIndex({ currentIndex: currentIndex - 1 });
  const [onSlideChanged,setSlideChanged] = useState() 
  useEffect(() => {
    document.title = "JohanDeMeij.com | Home";
    props.actions.mainAction(ACTIONS.LOAD_GALLERY,[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderImages = () => {
   return Object.values(props.photos).map(photo=>{
      console.log(`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F${photo.name}?alt=media`)
      return <img key={photo.id} src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F${photo.name}?alt=media`} width="100%"  object-fit="cover"  onDragStart={handleOnDragStart} className="gallery-image" />
    })
  }
  const renderThumbs = () =>{
     return( <ul className="thumbnails">{Object.values(props.photos).map((photo, i) =>{
     return(<li key={i} onClick={() => slideTo(i)}>{<img key={photo.id} src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F${photo.name}?alt=media`} width="100px"  object-fit="cover"  onDragStart={handleOnDragStart} className="gallery-image" />}</li>)
       })}
      </ul>)}
      
  const renderGallery =(data)=> {
    return (<AliceCarousel mouseTrackingEnabled
      dotsDisabled={true}
      buttonsDisabled={true}
      slideToIndex={currentIndex}
      onSlideChanged={onSlideChanged}
    >
      { [1,2,3,4,5].map((photo, i) =>{ 
        console.log(photo)
        return(<div key={i} className="yours-custom-class"><h2>{ photo.name }</h2></div>)}) }
    </AliceCarousel>);
  }
  const handleOnDragStart = (e) => e.preventDefault()
  return (<>
  <section className="photo-gallery">
    <div className="container">
      <div className="row">
      <div className="col-10 offset-1 text-center">
      { renderThumbs() }
          <Button variant="secondary" onClick={() => slidePrev()}>Prev button</Button>{" "}
          <Button variant="dark" onClick={() => slideNext()}>Next button</Button>
        <h1>Gallery</h1>
      {renderGallery(props.photos)}
      </div>
      </div>
    </div>
  </section>
  </>)
}

function mapStateToProps(state) {
  return {
    photos:state.galleryReducer.gallery
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
