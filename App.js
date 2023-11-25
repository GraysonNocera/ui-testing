import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withDelay } from 'react-native-reanimated';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/FontAwesome';

const colors = {
  primary: '#5b76c7',
  linearGradient: ['#ffcfcc', '#cce6ff'],
  orange: '#ffcfcc',
  white: '#fff',
};

export default function App() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [isConnected, setIsConnected] = useState(false);
  const xTranslation = useSharedValue(100);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    scale.value = 0.9

    // Simulate bluetooth
    setTimeout(() => {
      scale.value = 1
      opacity.value = 0

      setTimeout(() => {
        setIsConnected(true)
        xTranslation.value = 0
        opacity.value = 1
      }, 1000)
    }, 4000)
  };

  const handlePressOut = () => {
    scale.value = 1
  };

  const animatedStyleConnectToBluetooth = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 100 }) }],
    opacity: withTiming(opacity.value, { duration: 500 }),
  }));

  const animatedStyleDataContainer = useAnimatedStyle(() => ({
    transform: [{ translateX: withDelay(500, withSpring(xTranslation.value, { duration: 500, dampingRatio: 0.4 })) }],
    opacity: withDelay(500, withTiming(opacity.value, { duration: 200 })),
  }));

  return (
    <LinearGradient 
    colors={['#ffcfcc', '#cce6ff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}>

      {!isConnected && (
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.connectToBluetooth, animatedStyleConnectToBluetooth]}>
          <Text style={{fontSize: 16, color: colors.white}}>Connect to Bluetooth</Text>
        </Animated.View>
      </Pressable>
      )}

      {isConnected && (
      <Animated.View style={[styles.dataContainer, animatedStyleDataContainer]}>
        <View style={styles.dataItem}>
          <View style={styles.dataIconContainer}>
            <Icon name="flask" size={24} color="#2196F3" />
          </View>
          <View style={styles.dataTextContainer}>
            <Text style={styles.dataLabel}>Blood Alcohol Content (BAC):</Text>
            <Text style={styles.dataValue}>0</Text>
          </View>
        </View>
        <View style={styles.dataItem}>
          <View style={styles.dataIconContainer}>
            <Icon name="car" size={24} color="#2196F3" />
          </View>
          <View style={styles.dataTextContainer}>
            <Text style={styles.dataLabel}>Time until sobriety (hours):</Text>
            <Text style={styles.dataValue}>0</Text>
          </View>
        </View>
        <View style={styles.dataItem}>
          <View style={styles.dataIconContainer}>
            <Icon name="glass" size={24} color="#E67E22" />
          </View>
          <View style={styles.dataTextContainer}>
            <Text style={styles.dataLabel}>Drink Count:</Text>
            <Text style={styles.dataValue}>0</Text>
          </View>
        </View>
      </Animated.View>
      )}

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
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
  },
  greetingContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  riskContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  riskText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  settingsButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  contactButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  emergencyButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emergencyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  dataItem: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dataIconContainer: {
    marginRight: 10,
  },
  dataTextContainer: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataValue: {
    fontSize: 16,
  },
  highRiskButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  highRiskButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
