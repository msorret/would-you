import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const sheetDBBaseUrl = 'https://sheetdb.io/api/v1/nmnzlu8qztwde';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GridScreen = ({ route, navigation }) => {
  const { gameCode } = route.params;
  const [grid, setGrid] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [answerKey, setAnswerKey] = useState({});
  const [highScore, setHighScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    RammettoOne: require('../assets/RammettoOne-Regular.ttf'),
  });

  useEffect(() => {
    fetchGameData();
    loadHighScore();
  }, []);

  const fetchGameData = async () => {
    try {
      const response = await fetch(
        `${sheetDBBaseUrl}/search?Game_Code=${gameCode}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const gameData = data[0];
        setPlayerList(
          gameData.Player_List ? gameData.Player_List.split(', ') : []
        );
        setCharacterList(
          gameData.Character_List ? gameData.Character_List.split(', ') : []
        );
        setAnswerKey(
          gameData.Answer_Key ? JSON.parse(gameData.Answer_Key) : {}
        );
        setGrid(
          Array.from({ length: gameData.Player_List.split(', ').length }, () =>
            Array(gameData.Character_List.split(', ').length).fill('white')
          )
        );
      }
    } catch (error) {
      console.error('Error fetching game data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHighScore = async () => {
    try {
      const score = await AsyncStorage.getItem('highScore');
      if (score !== null) {
        setHighScore(parseInt(score, 10));
      }
    } catch (error) {
      console.error('Error loading high score:', error);
    }
  };

  const handleCellPress = (i, j) => {
    const newGrid = grid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === i && colIndex === j) {
          if (cell === 'white') return '#d6d6d6';
          if (cell === '#d6d6d6') return '#58E327';
          return 'white';
        }
        return cell;
      });
    });

    setGrid(newGrid);
  };

  const handleCheckPress = () => {
    navigation.navigate('Check', {
      grid,
      playerList,
      characterList,
      updateHighScore,
      gameCode,
    });
  };

  const updateHighScore = async (score) => {
    try {
      const currentHighScore = await AsyncStorage.getItem('highScore');
      if (currentHighScore === null || score > parseInt(currentHighScore, 10)) {
        await AsyncStorage.setItem('highScore', score.toString());
        setHighScore(score);
      }
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#FE5EA1" />;
  }

  const maxCells = Math.max(playerList.length, characterList.length);
  const cellSize = Math.min((screenWidth - 40) / (maxCells + 1), 60);
  const fontSize = cellSize * 0.25;

  return (
    <View style={styles.root}>
      <ScrollView horizontal>
        <ScrollView style={styles.root}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.instructionsButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.instructionsButtonText}>How to Play</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <View style={styles.row}>
              <View
                style={[
                  styles.emptyCell,
                  { width: cellSize, height: cellSize },
                ]}></View>
              {characterList.map((name, index) => (
                <Text
                  key={index}
                  style={[
                    styles.nameCell,
                    { width: cellSize, height: cellSize, fontSize },
                  ]}>
                  {name.split(' ').join('\n')}
                </Text>
              ))}
            </View>
            {playerList.map((name, i) => (
              <View key={i} style={styles.row}>
                <Text
                  style={[
                    styles.nameCellVertical,
                    { width: cellSize, height: cellSize, fontSize },
                  ]}>
                  {name.split(' ').join('\n')}
                </Text>
                {grid[i].map((cellColor, j) => (
                  <TouchableOpacity
                    key={j}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: cellColor,
                        width: cellSize,
                        height: cellSize,
                      },
                    ]}
                    onPress={() => handleCellPress(i, j)}
                  />
                ))}
              </View>
            ))}
            <Text style={[styles.highScore, { fontSize: fontSize * 0.8 }]}>
              High Score: {highScore !== null ? highScore : 'null'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleCheckPress}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              <Text style={styles.instructionsText}>
                 You are trying to figure out which LEFT player has which TOP secret identity.{"\n"}{"\n"}
              Tap once to turn the cell GREY: {"\n"} indicating you have some information that tells you the LEFT player does NOT have that TOP secret identity.{"\n"}{"\n"}
              Tap again to turn the cell GREEN: {"\n"} indicating you have some information that tells you the LEFT player DOES in fact impersonating that TOP secret identity.{"\n"}{"\n"}
              Tap a third time to turn the cell back to white.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FBD5A8', // Set the background color for the whole app
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 80,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 50,
    width: screenWidth - 5,
    backgroundColor: '#FBD5A8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyCell: {
    width: 35,
    height: 35,
  },
  nameCell: {
    fontFamily: 'RammettoOne',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    writingDirection: 'ltr',
    transform: [{ rotate: '45deg' }],
    paddingTop: 15,
    paddingBottom: 10,
  },
  nameCellVertical: {
    fontFamily: 'RammettoOne',
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    transform: [{ rotate: '0deg' }],
  },
  cell: {
    margin: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: '#FE5EA1',
    borderRadius: 5,
    marginBottom: 50,
  },
  instructionsButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  },
  highScore: {
    fontFamily: 'RammettoOne',
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
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
    marginTop: 10,
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
    marginBottom: 50,
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FBD5A8',
    borderRadius: 10,
    padding: 20,
    width: screenWidth - 40,
    height: screenHeight - 100,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#FE5EA1',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'RammettoOne',
  },
  instructionsTitle: {
    fontFamily: 'RammettoOne',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionsText: {
    fontFamily: 'RammettoOne',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  spacing: {
    height: 50,
  }
});

export default GridScreen;
