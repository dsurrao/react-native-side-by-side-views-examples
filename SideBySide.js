import React from 'react';
import { Dimensions, Image, PanResponder, StyleSheet, Text, View }
  from 'react-native';

export class SideBySide extends React.Component {
  _dividerHeight = 35;
  _dividerWidth = 35;
  _dividerOpacity = 0.5;

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: 0,
      leftViewWidth: 0,
      rightViewWidth: 0,
      dividerTop: 0,
      dividerLeft: 0,
      dividerLeftStart: 0,
      children: {},
      leftViewFlex: 1
    };
    this.renderChildren = this.renderChildren.bind(this)
  }

  componentWillMount() {
    this.setViewControlDimensions();

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
        this.setState((prevState, props) => ({
          dividerLeftStart: prevState.dividerLeft,
          leftViewWidthStart: prevState.leftViewWidth,
          rightViewWidthStart: prevState.rightViewWidth
        }));
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this.setState((prevState, props) => ({
          dividerLeft: prevState.dividerLeftStart + gestureState.dx,
          leftViewFlex: (prevState.leftViewWidthStart + gestureState.dx)/
            (prevState.rightViewWidthStart - gestureState.dx),
          leftViewWidth: prevState.leftViewWidthStart + gestureState.dx,
          rightViewWidth: prevState.rightViewWidthStart - gestureState.dx
        }));
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from
        // becoming the JS responder. Returns true by default. Is currently
        // only supported on android.
        return true;
      },
    });
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.orientationChanged.bind(this));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.orientationChanged);
  }

  orientationChanged(evt) {
    this.setViewControlDimensions();
  }

  setViewControlDimensions() {
    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;
    this.setState((prevState, props) => ({
      leftViewWidth: deviceWidth/2,
      rightViewWidth: deviceWidth/2,
      leftViewFlex: 1,
      dividerLeft: (deviceWidth/2) - (this._dividerWidth/2),
      dividerTop: deviceHeight/2,
    }));
  }

  renderChildren() {
    this._children = React.Children.map(this.props.children,
     (child, index) => {
       return React.cloneElement(child, {style:
         {flex: (index == 0) ? this.state.leftViewFlex : 1,
         padding: 1}});
     });
    return this._children;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderChildren()}
        <Image style={{position: 'absolute',
            top: this.state.dividerTop,
            left: this.state.dividerLeft,
            height: this._dividerHeight,
            width: this._dividerWidth,
            opacity: this._dividerOpacity}}
            source={require('./img/arrow-transfer.jpg')}
            {...this._panResponder.panHandlers}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
