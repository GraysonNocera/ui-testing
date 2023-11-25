import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors, Chip, Button } from 'react-native-ui-lib';
import React, { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const buttonRef = useRef(null);

  const handlePressIn = (buttonRef) => {
    buttonRef.transitionTo({ scale: 0.9 }, 300); // Shrink the button on press
  };

  const handlePressOut = (buttonRef) => {
    buttonRef.transitionTo({ scale: 1 }, 300); // Return to normal size on release
  };

  return (
    <LinearGradient 
    colors={['#ffcfcc', '#cce6ff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}>
      <Button
              backgroundColor="#5b76c7"
              label="Connect to Bluetooth"
              labelStyle={{fontWeight: '500', fontSize: 20, color: 'white'}} // text style
              enableShadow
              borderRadius={20} // how rounded the edges are
              onPress={() => console.log('Connect to Bluetooth')}
            />
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    height: 150,
    width: 200,
    borderRadius: 20, // <-- Outer Border Radius
  },
});
