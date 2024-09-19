import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const WaitingScreen = ({ route, navigation }) => {
  const { gameCode } = route.params;

  const [fontsLoaded] = useFonts({
    'RammettoOne': require('../assets/RammettoOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handleEveryoneIn = () => {
    navigation.navigate('Grid', { gameCode });
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Waiting for everyone to join...</Text>
      <TouchableOpacity style={styles.button} onPress={handleEveryoneIn}>
        <Text style={styles.buttonText}>Everyone's in!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBD5A8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'RammettoOne',
    color: 'black',
  },
  button: {
    backgroundColor: '#FE5EA1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'RammettoOne',
  },
   backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: '#FE5EA1',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  },
});

export default WaitingScreen;
