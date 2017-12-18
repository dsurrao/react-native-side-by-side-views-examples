import React from 'react';
import { Text, View } from 'react-native';
import { SideBySide } from './SideBySide';
import { SideBySideTest } from './SideBySideTest';

export default class App extends React.Component {
  render() {
    return (
      <SideBySideTest>
        <View>
          <Text>View One</Text>
        </View>
        <View>
          <Text>View Two</Text>
        </View>
      </SideBySideTest>
    );
  }
}
