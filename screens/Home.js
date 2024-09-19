import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFonts } from 'expo-font';

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'RammettoOne': require('../assets/RammettoOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }


  return (
    <View style={styles.container}>
       

      <Svg height="150" width={Dimensions.get('window').width} style={styles.svgContainer}>
        <SvgText
          x="50%"
          y="40%"
          textAnchor="middle"
          fontSize="48"
          fontFamily="RammettoOne"
          stroke="white"
          strokeWidth={2}
          fill="#FF8A00"
        >
          WOULD
        </SvgText>
        <SvgText
          x="50%"
          y="80%"
          textAnchor="middle"
          fontSize="48"
          fontFamily="RammettoOne"
          stroke="white"
          strokeWidth={2}
          fill="#FF8A00"
        >
          YOU?
        </SvgText>
      </Svg>
      
      
      <TouchableOpacity style={[styles.button, styles.newGameButton]} onPress={() => navigation.navigate('CreateGameScreen')}>
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
            New Game
          </SvgText>
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.joinGameButton]} onPress={() => navigation.navigate('Join')}>
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
            Join Game
          </SvgText>
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity style={styles.howToPlayButton} onPress={() => navigation.navigate('InstructionsScreen')}>
          <Text style={styles.howToPlayButtonText}>How to Play</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE5EA1',
  },

  svgContainer: {
    marginBottom: 40,
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
  },
  newGameButton: {
    backgroundColor: 'black',
  },
  joinGameButton: {
    backgroundColor: '#FF8A00',
  },
   howToPlayButton: {
    padding: 10,
    backgroundColor: '#FE5EA1',
    borderRadius: 5,
  },
  howToPlayButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  },
});

export default HomeScreen;