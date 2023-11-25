import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Colors, Chip, Button } from 'react-native-ui-lib';
import React, { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const colors = {
  primary: '#ffcfcc',
  secondary: '#cce6ff',
};

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient 
    colors={['#ffcfcc', '#cce6ff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{...styles.connectToBluetooth, transform: [{scale: scale}]}}>
          <Text>Press me</Text>
        </Animated.View>
      </Pressable>
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
  connectToBluetooth: {
    backgroundColor: '#ffcfcc',
    borderRadius: 20,
    padding: 10,
  },
});
