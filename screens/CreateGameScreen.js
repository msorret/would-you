import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Tags from 'react-native-tags';
import { useFonts } from 'expo-font';

const sheetDBBaseUrl = 'https://sheetdb.io/api/v1/nmnzlu8qztwde';

const CreateGameScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'RammettoOne': require('../assets/RammettoOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const [gameCode, setGameCode] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [characterList, setCharacterList] = useState([]);

  const handleCreateGame = async () => {
    if (gameCode && playerList.length > 0 && characterList.length > 0) {
      try {
        const newGameData = {
          Game_Code: gameCode,
          Num_Players: playerList.length,
          Player_List: playerList.join(', '),
          Character_List: characterList.join(', '),
          Answer_Key: "{}" // Initialize an empty answer key
        };

        const response = await fetch(sheetDBBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: [newGameData] })
        });

        if (response.ok) {
          Alert.alert('Success', 'Game created successfully.');
          navigation.navigate('Join'); // Navigate to the input screen
        } else {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          Alert.alert('Error', 'Failed to create the game.');
        }
      } catch (error) {
        console.error('Catch error:', error.message);
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Validation', 'Please fill in all fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>New Game</Text>
      <TextInput
        style={styles.input}
        value={gameCode}
        onChangeText={setGameCode}
        placeholder="Create a 4 Digit Game Code"
      />
      <View style={styles.tagContainer}>
        <Text style={styles.label}>Player Names</Text>
        <Text style={styles.labelsmall}>type in a name then press space to add</Text>
        <Tags
          initialTags={playerList}
          onChangeTags={tags => setPlayerList(tags)}
          inputStyle={styles.tagInput}
          renderTag={({ tag, index, onPress }) => (
            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.tagContainer}>
        <Text style={styles.label}>Character Names</Text>
        <Text style={styles.labelsmall}>type in a name then press space to add</Text>
        <Tags
          initialTags={characterList}
          onChangeTags={tags => setCharacterList(tags)}
          inputStyle={styles.tagInput}
          renderTag={({ tag, index, onPress }) => (
            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
        <Text style={styles.buttonText}>Create Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#FBD5A8',
  },
  title: {
    fontSize: 32,
    fontFamily: 'RammettoOne',
    color: 'black',
    marginBottom: 20,
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
  tagContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'RammettoOne',
    color: 'black',
    marginBottom: 5,
  },
  labelsmall: {
    fontSize: 8,
    fontFamily: 'RammettoOne',
    color: 'black',
    marginBottom: 5,
  },
  tagInput: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: '#FE5EA1',
    padding: 5,
    borderRadius: 5,
    margin: 2,
  },
  tagText: {
    color: 'white',
    fontFamily: 'RammettoOne',
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

export default CreateGameScreen;
