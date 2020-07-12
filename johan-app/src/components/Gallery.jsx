import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import dayjs from "dayjs";
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
    return (<>
    </>);
  }
  const handleOnDragStart = (e) => e.preventDefault()
  return (<>
  <section className="photo-gallery">
    <div className="container">
      <div className="row">
      <div className="col-10 offset-1 text-center">
     
        <h1>Gallery</h1>
        <Carousel autoPlay interval="5000" transitionTime="1000">
                    <div>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage1.jpg?alt=media`} width="100%" height="100%" object-fit="cover"/>
                        <p className="legend">My Classic Still 1</p>
                    </div>
                    <div>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage2.jpg?alt=media`} width="100%" height="100%" object-fit="cover"/>
                        <p className="legend">My Classic Still 2</p>
                    </div>
                    <div>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2Fimage3.jpg?alt=media`}  width="100%" height="100%" object-fit="cover"/>
                        <p className="legend">My Classic Still 3</p>
                    </div>
                </Carousel>
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
