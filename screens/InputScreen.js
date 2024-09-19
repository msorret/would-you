import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Picker } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useFonts } from 'expo-font';

const sheetDBBaseUrl = 'https://sheetdb.io/api/v1/nmnzlu8qztwde';

const InputScreen = ({ route, navigation }) => {
  const { gameData } = route.params;
  const [yourName, setYourName] = useState([]);
  const [gotId, setGotId] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [answerKey, setAnswerKey] = useState({});
  const [fontsLoaded] = useFonts({
    'RammettoOne': require('../assets/RammettoOne-Regular.ttf'),
  });

  useEffect(() => {
    setPlayerList(gameData.Player_List.split(', ').map((name, index) => ({ id: index, name })));
    setCharacterList(gameData.Character_List.split(', ').map((name, index) => ({ id: index, name })));
    setAnswerKey(JSON.parse(gameData.Answer_Key));
  }, [gameData]);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handleSubmit = async () => {
    if (yourName.length > 0 && gotId.length > 0) {
      try {
        // Update the answer key
        const updatedAnswerKey = { ...answerKey, [yourName[0]]: gotId[0] };
        const patchData = { Answer_Key: JSON.stringify(updatedAnswerKey) };
        const patchUrl = `${sheetDBBaseUrl}/Game_Code/${gameData.Game_Code}`;

        const response = await fetch(patchUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: patchData })
        });

        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (error) {
          throw new Error(`Failed to parse response as JSON: ${responseText}`);
        }

        if (response.ok) {
          navigation.navigate('Waiting', { gameCode: gameData.Game_Code });
        } else {
          console.error('Error response:', result);
          Alert.alert('Error', 'Failed to update the database.');
        }
      } catch (error) {
        console.error('Catch error:', error.message);
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Validation', 'Please select both names.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Your Name</Text>
      <View style={styles.multiSelectContainer}>
        <MultiSelect
          items={playerList}
          uniqueKey="name"
          onSelectedItemsChange={setYourName}
          selectedItems={yourName}
          selectText="Select your name"
          searchInputPlaceholderText="Search names..."
          single={true}
          styleMainWrapper={styles.multiSelect}
          styleDropdownMenuSubsection={styles.multiSelectDropdown}
        />
      </View>
      <Text style={styles.label}>Your Secret Identity</Text>
      <View style={styles.multiSelectContainer}>
        <MultiSelect
          items={characterList}
          uniqueKey="name"
          onSelectedItemsChange={setGotId}
          selectedItems={gotId}
          selectText="Select a Secret Identity"
          searchInputPlaceholderText="Search identities..."
          single={true}
          styleMainWrapper={styles.multiSelect}
          styleDropdownMenuSubsection={styles.multiSelectDropdown}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FBD5A8',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'RammettoOne',
    color: 'black',
  },
  multiSelectContainer: {
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderRadius: 10,
  //   marginBottom: 20,
     width: '80%',
  //   backgroundColor: 'white',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 4, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   elevation: 4,
   },
  multiSelect: {
    width: '100%',
  },
  multiSelectDropdown: {
    paddingLeft: 10,
    paddingRight: 10,
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

export default InputScreen;


