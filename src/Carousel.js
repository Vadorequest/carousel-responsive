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

class Carousel extends Component {
  render() {
    const { id, className, classes, slides, slideSize, debug, ...restStyle } = this.props;

    // Do not continue if there are no slide.
    if(!slides.length){
      return debug ? `There are no slides to be displayed. Make sure to provide your data through the "slides" property.` : null;
    }

    return (
      <div
        id={id}
        className={classname(className, classes.carousel)}
        style={{...restStyle}}
      >
        <div
          className={classname('slides', classes.slides)}
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
                  className={classname('slide', classes.slide)}
                  key={slide.id}
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
                            className={classname(className, classes[className])}
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
