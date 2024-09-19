import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

const sheetDBUrl = 'https://sheetdb.io/api/v1/nmnzlu8qztwde';

const CheckScreen = ({ route, navigation }) => {
  const { grid, playerList, characterList, updateHighScore, gameCode } = route.params;

  if (!playerList || !characterList) {
    Alert.alert('Error', 'Player list or character list is missing.');
    return null;
  }

  const guesses = characterList.map((character, i) => {
    const j = grid[i].indexOf('#58E327');
    if (j !== -1) {
      return { character, player: playerList[j] };
    }
    return { character, player: null };
  });

  const handleSubmit = async () => {
    try {
      console.log(`Fetching game data for gameCode: ${gameCode}`);
      const response = await fetch(sheetDBUrl);
      const data = await response.json();
      console.log('Fetched game data:', data);

      const gameData = data.find(row => row.Game_Code === gameCode);
      if (!gameData) {
        Alert.alert('Error', 'Game data not found.');
        return;
      }

      const answerKey = JSON.parse(gameData.Answer_Key);
      let correctCount = 0;

      guesses.forEach(guess => {
        if (guess.player && answerKey[guess.player] === guess.character) {
          correctCount++;
        }
      });

      updateHighScore(correctCount);
      navigation.navigate('Result', { guesses, answerKey });
    } catch (error) {
      console.error('Error checking guesses:', error);
      Alert.alert('Error', 'Failed to check the guesses.');
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {guesses.map((guess, index) => (
          <Text key={index} style={styles.guessText}>
            {guess.player ? `${guess.player} is impersonating ${guess.character}` : `${guess.character} has no guess`}
          </Text>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Svg height="60" width="200">
            <SvgText
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="18"
              fontFamily="RammettoOne"
              fill="white"
            >
              Submit
            </SvgText>
          </Svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FBD5A8', // Set the background color for the whole app
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 200,
  },
  guessText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'RammettoOne',
  },
  button: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: '#FE5EA1',
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

export default CheckScreen;
