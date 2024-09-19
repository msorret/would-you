import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFonts } from 'expo-font';

const InstructionsScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'RammettoOne': require('../assets/RammettoOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.instructionsHeader}>How to Play </Text>
      <Text style={styles.instructionsText}>
        Each player chooses a mystery character from an agreed upon list. When it is a player's turn, they can choose any other player at the table and ask them a subjective yes or no question about their secret identity. The player who is being asked must answer truthfully and everyone can hear the answer. 
        {"\n\n"}
        Subjective questions are ones that do not have a definitive yes or no answer. For example, "Would your person own a vintage car?" is subjective - because even if we don't know if that person/character does or doesn't own a vintage car, we could imagine a type of person that WOULD. On the flipside, questions about someone's appearance or characteristics like "Does your person wear glasses?" are not subjective.
        {"\n\n"}
        After each question, players update their gameboard to grey out identities that don't match the answer to the question.
        {"\n\n"}
        When a player thinks they know who someone's secret identity is, they fill in the gameboard green. If they think they know all the players' secret identities, they can check their answers. If the guess is correct, they win the game. If the guess is wrong, your highest score is saved, and the game continues.
        {"\n\n"}
        The game ends when the 30 minute timer runs out or when a player guesses every secret identity correctly - whichever comes first.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 120,
    backgroundColor: '#FBD5A8',
  },
 
  instructionsText: {
    fontSize: 16,
    fontFamily: 'RammettoOne',
    color: 'black',
    lineHeight: 24,
  },

  instructionsHeader: {
    fontSize: 28,
    fontFamily: 'RammettoOne',
    color: '#FF8A00',
  
  }, 

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: '#FE5EA1',
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  },
});

export default InstructionsScreen;
