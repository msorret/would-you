import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sheetDBBaseUrl = 'https://sheetdb.io/api/v1/nmnzlu8qztwde';

const JoinScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleJoin = async () => {
    try {
      const response = await fetch(`${sheetDBBaseUrl}/search?Game_Code=${code}`);
      const data = await response.json();
      if (data.length > 0) {
        await resetHighScore(); // Reset high score when starting a new game
        navigation.navigate('Input', { gameData: data[0] });
      } else {
        alert('Invalid game code');
      }
    } catch (error) {
      console.error('Error fetching game data:', error);
      alert('Failed to fetch game data');
    }
  };

  const resetHighScore = async () => {
    try {
      await AsyncStorage.removeItem('highScore');
    } catch (error) {
      console.error('Error resetting high score:', error);
    }
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Join Game</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter the 4 Digit Game Code"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FBD5A8',
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
  title: {
    fontSize: 32,
    fontFamily: 'RammettoOne',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
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
});

export default JoinScreen;
