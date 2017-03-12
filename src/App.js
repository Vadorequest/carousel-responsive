import React, { PropTypes, Component } from 'react';
import classname from 'classname';
import withStyle from 'react-jss';
import compose from 'recompose/compose';

const styles = {
  carousel: {
    position: 'relative',
    overflowX: 'hidden',
  },
};

class App extends Component {
  render() {
    const { id, className, classes, ...restStyle } = this.props;

    return (
      <div
        id={id}
        className={classname(className, classes.carousel)}
        style={{...restStyle}}
      >
        Hello
      </div>
    );
  }
}

App.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,

  // Styling props (AKA restStyle) - Any unknown prop will be considered as styling prop for the main container.
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

App.defaultProps = {
  id: 'carousel-responsive',
  className: 'carousel-responsive',
  width: '100%', // 100% of parent container
  height: '350px',
};

export default compose(
  withStyle(styles),
)(App);
