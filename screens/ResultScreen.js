import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

const ResultScreen = ({ route, navigation }) => {
  const { guesses, answerKey } = route.params;


  const checkGuesses = () => {
    let correctCount = 0;
    for (const guess of guesses) {
      console.log(guess);
      console.log(answerKey);
      if (guess.character && answerKey[guess.player] === guess.character) {
        correctCount++;
      }
    }
    return correctCount;
  };
  if (!guesses || !answerKey) {
    return (
      <View style={styles.container}>
  
      
        <Text style={styles.resultText}>Invalid game data.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
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
              Back to Home
            </SvgText>
          </Svg>
        </TouchableOpacity>
      </View>
    );
  }

  const correctCount = checkGuesses();
  const totalGuesses = guesses.length;
  const win = correctCount === totalGuesses;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {win ? 'You were correct!!! You win!' : `You got ${correctCount} out of ${totalGuesses} correct.`}
      </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#FBD5A8',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default ResultScreen;
