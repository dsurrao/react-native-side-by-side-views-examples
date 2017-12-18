import React from 'react';
import { Image, Text, View } from 'react-native';
import { SideBySide } from './SideBySide';

export default class App extends React.Component {
  render() {
    return (
      <SideBySide>
        <View>
          <Text>View One</Text>
          <Image style={{height: 100}}
            source={{uri: 'https://cdn.shopify.com/s/files/1/1368/0279/products/Emerge_America_300x.jpg?v=1504906105'}}/>
        </View>
        <View>
          <Text>View Two</Text>
          <Image style={{height: 100}}
            source={{uri: 'https://cdn.shopify.com/s/files/1/1368/0279/products/Women_Together_300x.jpg?v=1506351843'}}/>

        </View>
      </SideBySide>
    );
  }
}
