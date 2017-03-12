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
  imageBackground: {
    extend: 'image',
    backgroundSize: 'cover',
  },
  imageForeground: {
    extend: 'image',
    backgroundSize: 'contain',
  },
};

class Carousel extends Component {
  render() {
    const { id, className, classes, ...restStyle } = this.props;

    return (
      <div
        id={id}
        className={classname(className, classes.carousel)}
        style={{...restStyle}}
      >
        <div
          className={classname('slides', classes.slides)}
        >
          <div
            className={classname('slide', classes.slide)}
          >
            <div
              className={classname('images-container', classes.imagesContainer)}
            >
              <div
                className={classname('imageBackground', classes.imageBackground)}
                style={{ backgroundImage: 'url("http://static.milibris.com/carousel/sfr-presse/resources/a2a09d44-c739-4ed4-ab3b-bed47e4f5b91")' }}
              ></div>
              <div
                className={classname('imageForeground', classes.imageForeground)}
                style={{ backgroundImage: 'url("http://static.milibris.com/carousel/sfr-presse/resources/1db4da93-1d0c-44d3-afb9-7bef3ec2656a")' }}
              ></div>
            </div>
          </div>

          <div
            className={classname('slide', classes.slide)}
          >
            <div
              className={classname('images-container', classes.imagesContainer)}
            >
              <div
                className={classname('imageBackground', classes.imageBackground)}
                style={{ backgroundImage: 'url("http://static.milibris.com/carousel/sfr-presse/resources/a2a09d44-c739-4ed4-ab3b-bed47e4f5b91")' }}
              ></div>
              <div
                className={classname('imageForeground', classes.imageForeground)}
                style={{ backgroundImage: 'url("http://static.milibris.com/carousel/sfr-presse/resources/1db4da93-1d0c-44d3-afb9-7bef3ec2656a")' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,

  // Styling props (AKA restStyle) - Any unknown prop will be considered as styling prop for the main container.
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

Carousel.defaultProps = {
  id: 'carousel-responsive',
  className: 'carousel-responsive',
  width: '100%', // 100% of parent container
  height: '350px',
};

export default compose(
  withClasses(styles),
)(Carousel);
