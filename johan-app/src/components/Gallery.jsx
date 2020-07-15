import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "redux/actions/types";
import { mainAction } from "redux/actions/index.actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import LazyLoad from 'react-lazyload';
import 'react-alice-carousel/lib/alice-carousel.css'

const PhotoGallery = (props) => {
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const slideTo = (i) => setCurrentIndex({ currentIndex: i });
  const slideNext = () => setCurrentIndex({ currentIndex: currentIndex + 1});
  const slidePrev = () => setCurrentIndex({ currentIndex: currentIndex - 1 });
  const [fadeOut,setFadeOut] = useState()
  const [slideLocation,setSlideLocation] = useState(0) 
  useEffect(() => {
    document.title = "JohanDeMeij.com | Home";
    props.actions.mainAction(ACTIONS.LOAD_GALLERY,[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderImages = () => {
   return Object.values(props.photos).map(photo=>{
      return ( <li className={"slide "+fadeOut}><LazyLoad width="100%" height="100%" object-fit="contain" ><img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F${photo.name}?alt=media`} width="100%" height="100%" object-fit="contain"/>
      {photo.caption ? <p className="legend">{photo.caption}</p>:""}</LazyLoad></li>)
    })
  }
const slideImage = (item) =>{
  window.scrollTo(0,0)
  setFadeOut("fade-in")
  setTimeout(()=>{
    setFadeOut("")
  },1000)
  let location = (item * 100)
  return setSlideLocation(`-${location}%`)
}
  const renderThumbnails = () => {
    return Object.values(props.photos).map((photo,i)=>{
      return ( <li onClick={()=>slideImage(i)} className="thumb" ariaLabel={"slide item "+i} role="button" tabindex="0" style={{width: "80px"}}><LazyLoad width="100%" height="100%" object-fit="cover" ><img src={`https://firebasestorage.googleapis.com/v0/b/johandemeij-513b2.appspot.com/o/gallery%2F${photo.name}?alt=media`} width="100%" height="100%" object-fit="cover"/></LazyLoad>
      </li>)
    })
  }


  const handleOnDragStart = (e) => e.preventDefault()
  return (<>
  <section className="photo-gallery">
    <div className="container">
      <div className="row">
      <div className="col-10 offset-1 text-center">
        <h1 style={{color: "rgb(0, 0, 0)", textAlign:"center", marginBottom: "25px"}}>Gallery</h1>
    <div className="galleryContainer">
    <div width="100%" height="100%" object-fit="cover" className="vail"></div>
      <ul style={{transform: `translate3d(${slideLocation}, 0px, 0px)`, transitionDuration:" 650ms"}}>{renderImages()}</ul>
      
    </div>
    
    <ul>{renderThumbnails()}</ul>
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
