import React from 'react';
import { View, Text, PanResponder, TouchableHighlight, ScrollView, StyleSheet,
  Modal, Image, Dimensions, Alert } from 'react-native';

export class SideBySide extends React.Component {
  constructor(props) {
    super(props);
  }

  _dividerHeight = 35;
  _dividerWidth = 35;

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
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this._dividerImage.setNativeProps({left: this._dividerLeft + gestureState.dx});
        this._leftView.setNativeProps(
          {flex: (this._leftViewWidth + gestureState.dx)/(this._rightViewWidth - gestureState.dx)});
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // update position of dragged image and views
        this._dividerLeft = this._dividerLeft + gestureState.dx;
        this._leftViewWidth = this._leftViewWidth + gestureState.dx;
        this._rightViewWidth = this._rightViewWidth - gestureState.dx;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.orientationChanged.bind(this));
  }

  orientationChanged(evt) {
    this.setViewControlDimensions();
    this.renderViewControlDimensions();
  }

  setViewControlDimensions() {
    this._deviceHeight = Dimensions.get('window').height;
    this._deviceWidth = Dimensions.get('window').width;
    this._leftViewWidth = this._deviceWidth/2;
    this._rightViewWidth = this._leftViewWidth;
    this._dividerLeft = (this._deviceWidth/2) - (this._dividerWidth/2);
    this._dividerTop = this._deviceHeight/2;

    //console.log(this._deviceHeight);
    //console.log(this._deviceWidth);
  }

  renderViewControlDimensions() {
    this._dividerImage.setNativeProps({top: this._dividerTop,
      left: this._dividerLeft});
    this._leftView.setNativeProps(
      {flex: (this._leftViewWidth)/(this._rightViewWidth)});
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.orientationChanged);
  }

  render() {
    return (
    <View>
      <ScrollView style={{flexGrow:1}}>
        <View style={{flex:1, flexDirection:'row', alignItems: 'stretch'}}>
          <View ref={component => this._leftView = component}
            style={{flex: 1, backgroundColor: 'powderblue',
              paddingLeft: 5, paddingRight: 5, paddingBottom: 50}}>

            <TouchableHighlight onPress={this._onPressButton.bind(this)}>
              <Image style={{height: 100}}
                source={{uri: 'https://cdn.shopify.com/s/files/1/1368/0279/products/Emerge_America_300x.jpg?v=1504906105'}}/>
            </TouchableHighlight>
            <View>
              <Text style={styles.titleText}>Emerge America: Help Women Across
              The USA Run For Office</Text>
            </View>
            <View>
              <Text style={styles.baseText}>Emerge America is changing the
              face of politics by recruiting, training and providing a powerful
              network for Democratic women across the country who want to run
              for office.</Text>
            </View>
            <View>
              <Text style={styles.titleText}>The Problem</Text>
            </View>
            <View>
              <Text style={styles.baseText}>American women are vastly
              underrepresented at all levels of government. Though women make
              up more than half the population, they hold less than a third of
              elected offices. This is a problem and it must be addressed.</Text>
            </View>
            <View>
              <Text style={styles.titleText}>The Solution</Text>
            </View>
            <View>
              <Text style={styles.baseText}>Emerge America offers in-depth
              training programs for Democratic women who want to run for office.
              More women in political office benefits all of us! Female elected
              officials tend to be more responsive to constituents, overwhelmingly
              support and push forward democratic principles like equality and
              fairness and are more actively involved in gender-salient issues.
              Emerge America has a strong record. 52% of their alumni have been
              elected to office or appointed to boards or commissions.
              But there is still lots to be done.</Text>
            </View>

          </View>
          <View ref={component => this._rightView = component}
            style={{flex: 1, backgroundColor: 'skyblue', paddingLeft: 5,
            paddingRight: 5, paddingBottom: 50}}>
            <Image style={{height: 100}}
              source={{uri: 'https://cdn.shopify.com/s/files/1/1368/0279/products/Women_Together_300x.jpg?v=1506351843'}}/>
            <View>
              <Text style={styles.titleText}>Women Together Initiative: Connecting womens groups across the globe for greater collective power</Text>
            </View>
            <View>
              <Text style={styles.baseText}>Women’s grassroot groups travel across the globe to transfer skills and knowledge, share inspiration and innovation, and move all women forward.</Text>
            </View>
            <View>
              <Text style={styles.titleText}>The Problem</Text>
            </View>
            <View>
              <Text style={styles.baseText}>Globally, women’s grassroots groups work hard to uplift their communities through improved nutrition, health, education and more. However, their impact is limited by their isolation. Socio-cultural and economic restrictions deprive many women of the chance to travel beyond the boundaries of their own communities. Existing as isolated pockets of innovation and ability, they cannot disseminate their knowledge, cannot inspire, motivate or support each other, cannot work together to create new technologies, and cannot stand in solidarity. They remain bounded within structures of inequality that have denied their empowerment for generations.</Text>
            </View>
            <View>
              <Text style={styles.titleText}>The Solution</Text>
            </View>
            <View>
              <Text style={styles.baseText}>Supporting women’s groups to travel and meet, WT catalyzes the transfer of knowledge and skills from woman-to-woman globally. Imagine Nutrition Educators from Gorongosa, Mozambique travelling to meet the HIV Positive Mothers in Lilongwe, Malawi to share knowledge of locally-grown nutritional supplements for HIV! Imagine women’s Self Help Groups from Jamkhed, India meeting Economic Development groups in Gulu, Uganda to create new models for village-based banking! By supporting the world’s most marginalized women to connect with each other as innovators, educators and change-makers, we redefine what is possible for women and girls globally.</Text>
            </View>


          </View>
        </View>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, left: 30}}>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.vote}> Vote </Text>
        </TouchableHighlight>
      </View>

      <View style={{position: 'absolute', bottom: 0, right: 30}}>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.vote}> Vote </Text>
        </TouchableHighlight>
      </View>

      <Image ref={component => this._dividerImage = component}
        style={{position: 'absolute',
          top: this._dividerTop,
          height: this._dividerHeight,
          width: this._dividerWidth,
          opacity: 0.5,
          left: this._dividerLeft}}
          source={require('./img/arrow-transfer.jpg')}
        {...this._panResponder.panHandlers}/>

    </View>

    );
  }

  _onPressButton() {

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'green',
    width:100,
    backgroundColor:'orange'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  divider: {
    position: 'absolute',
    top: 300,
    height: 50,
    width: 50,
    opacity: 0.5
  },
  baseText: {
    //fontFamily: 'Cochin'
  },
  titleText: {
    //fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  vote: {
    //fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'white'
  }
})
