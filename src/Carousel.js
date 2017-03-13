import React, { PropTypes, Component } from 'react';
import classname from 'classname';
import withClasses from 'react-jss';
import compose from 'recompose/compose';

const styles = {
  carousel: {
    position: 'relative',
    overflowX: 'hidden',
  },
  slides: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    transition: 'transform 2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
  },
  slide: {
    flexShrink: 0,
    overflow: 'auto',
    width: '100%',
  },
  imagesContainer: {
    overflowX: 'hidden',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  image: {
    position: 'absolute',
    height: '350px',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    transition: 'transform 2s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
  },
  // There is only one background image, which is the first image in the array.
  imageBackground: {
    extend: 'image',
    backgroundSize: 'cover',
  },
  // There may be several foreground images, applied on top of each other.
  imageForeground: {
    extend: 'image',
    backgroundSize: 'contain',
  },
};

const BACKGROUND_PARALLAX = 70;
const FOREGROUND_PARALLAX = 20;

class Carousel extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentSlideIndex: 0,
    };

    this.slidesRef = null;

    this.goTo = this.goTo.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
    window.goToNext = this.goToNext;
  }

  componentDidMount() {
    if(this.props.debug) window.slides = this.slidesRef;
    this.goTo(0);
    window.goTo = this.goTo;
  }

  getNextIndex(index = this.state.currentSlideIndex){
    const { slides } = this.props;
    let newIndex = index + 1;
    if (newIndex === slides.length) { // Limit reached, reset.
      newIndex = 0;
    }

    return newIndex;
  }

  goToNext() {
    this.goTo(this.getNextIndex())
  }

  goTo(targetIndex) {
    const slides = this.slidesRef.querySelectorAll('.slide');

    slides.forEach((image, index) => {
      if (index === (targetIndex - 1)) {
        image.querySelector('.imageBackground').style.transform = `translate(+${BACKGROUND_PARALLAX}%, 0px)`;
        image.querySelector('.imageForeground').style.transform = `translate(+${FOREGROUND_PARALLAX}%, 0px)`;
      } else if (index === (targetIndex + 1)) {
        image.querySelector('.imageBackground').style.transform = `translate(-${BACKGROUND_PARALLAX}%, 0px)`;
        image.querySelector('.imageForeground').style.transform = `translate(-${FOREGROUND_PARALLAX}%, 0px)`;
      }else {
        image.querySelector('.imageBackground').style.transform = `translate(0%, 0px)`;
        image.querySelector('.imageForeground').style.transform = `translate(0%, 0px)`;
      }
    });

    // if(targetIndex === slides.length - 1){
    //   console.log('goto 0')
    //   const images = this.slidesRef.querySelectorAll('.image');
    //   images.forEach(image =>
    //     console.log(image)
    //     // image.querySelector('.image').style['transition-duration'] = `0s`
    //   );
    //   this.goTo(0);
    //   images.forEach(image =>
    //     image.querySelector('.image').style['transition-duration'] = `2s`
    //   );
    // }


    this.slidesRef.style.transform = `translate(${(targetIndex * -100)}%, 0px)`;

    this.setState({
      currentSlideIndex: targetIndex,
    });
  }

  autoPlay() {

  }

  render() {
    const { id, className, classes, slides, slideSize, debug, ...restStyle } = this.props;

    // Do not continue if there are no slide.
    if(!slides){
      return debug ? `There are no slides to be displayed. Make sure to provide your data through the "slides" property.` : null;
    }

    // Duplicate the first slide to the last position. (hack to give impression of infinite scrolling)
    if(!slides.__hasLast__){ // Only do this operation once, otherwise the last item will be duplicated at every render.
      slides.push(Object.assign({}, slides[0], { id: `last-${slides.length}`}));
      slides.__hasLast__ = true;
    }

    return (
      <div
        id={id}
        className={classname(className, classes.carousel)}
        style={{...restStyle}}
      >
        <div
          className={classname('slides', classes.slides)}
          ref={(slides) => { this.slidesRef = slides; }}
        >
          {
            slides.map((slide) => {
              const imageContainer = slide.sizes.find(slide => slide.size === slideSize);

              // Do not continue if the required size wasn't found.
              if(typeof imageContainer === 'undefined'){
                return debug ? `Unable to locate any image the "${slideSize}" size, make sure you provide this size, or change the "slideSize" property.` : null;
              }

              return (
                <div
                  key={slide.id}
                  className={classname('slide', classes.slide)}
                >
                  <div
                    className={classname('images-container', classes.imagesContainer)}
                  >
                    {
                      imageContainer.images.map((image, index) => {
                        // Only the first image is treated as background image. Other are foreground.
                        const className = index === 0 ? 'imageBackground' : 'imageForeground';

                        return (
                          <div
                            key={index} // XXX Index isn't supposed to change and can therefore be used as react key.
                            className={classname(className, classes[className], 'image')}
                            style={{ backgroundImage: `url("${image.url}")` }}
                          ></div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      action: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      sizes: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.string.isRequired,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
      ).isRequired,
      // style
    }).isRequired,
  ).isRequired,
  slideSize: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,

  // Styling props (AKA restStyle) - Any unknown prop will be considered as styling prop for the main container.
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

Carousel.defaultProps = {
  id: 'carousel-responsive',
  className: 'carousel-responsive',
  width: '100%', // 100% of parent container
  height: '350px',
  slides: [],
  slideSize: 'large',
  debug: false,
};

export default compose(
  withClasses(styles),
)(Carousel);
