import { useState, useEffect } from 'react';
import Notify from './Notify';
import axios from 'axios';

const WordCase = ({ keyPressed, unloadKeyPress }) => {
    const parentRows = 6;
    const inputsPerRow = 5;

    const [targetWord, setTargetWord] = useState([]);

    const generateRandomWord = () => {
        const words = ['which', 'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound', 'great', 'again', 'still', 'every', 'small', 'found', 'those', 'never', 'under', 'might', 'while', 'house', 'world', 'below', 'asked', 'going', 'large', 'until', 'along', 'shall', 'being', 'often', 'earth', 'began', 'since', 'study', 'night', 'light', 'above', 'paper', 'parts', 'young', 'story', 'point', 'times', 'heard', 'whole', 'white', 'given', 'means', 'music', 'miles', 'thing', 'today', 'later', 'using', 'money', 'lines', 'order', 'group', 'among', 'learn', 'known', 'space', 'table', 'early', 'trees', 'short', 'hands', 'state', 'black', 'shown', 'stood', 'front', 'voice', 'kinds', 'makes', 'comes', 'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready', 'quite', 'class', 'bring', 'round', 'horse', 'shows', 'piece', 'green', 'stand', 'birds', 'start', 'river', 'tried', 'least', 'field', 'whose', 'girls', 'leave', 'added', 'color', 'third', 'hours', 'moved', 'plant', 'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'check', 'floor', 'begin', 'woman', 'alone', 'plane', 'spell', 'watch', 'carry', 'wrote', 'clear', 'named', 'books', 'child', 'glass', 'human', 'takes', 'party', 'build', 'seems', 'blood', 'sides', 'seven', 'mouth', 'solve', 'north', 'value', 'death', 'maybe', 'happy', 'tells', 'gives', 'looks', 'shape', 'lives', 'steps', 'areas', 'sense', 'speak', 'force', 'ocean', 'speed', 'women', 'metal', 'south', 'grass', 'scale', 'cells', 'lower', 'sleep', 'wrong', 'pages', 'ships', 'needs', 'rocks', 'eight', 'major', 'level', 'total', 'ahead', 'reach', 'stars', 'store', 'sight', 'terms', 'catch', 'works', 'board', 'cover', 'songs', 'equal', 'stone', 'waves', 'guess', 'dance', 'spoke', 'break', 'cause', 'radio', 'weeks', 'lands', 'basic', 'liked', 'trade', 'fresh', 'final', 'fight', 'meant', 'drive', 'spent', 'local', 'waxes', 'knows', 'train', 'bread', 'homes', 'teeth', 'coast', 'thick', 'brown', 'clean', 'quiet', 'sugar', 'facts', 'steel', 'forth', 'rules', 'notes', 'units', 'peace', 'month', 'verbs', 'seeds', 'helps', 'sharp', 'visit', 'woods', 'chief', 'walls', 'cross', 'wings', 'grown', 'cases', 'foods', 'crops', 'fruit', 'stick', 'wants', 'stage', 'sheep', 'nouns', 'plain', 'drink', 'bones', 'apart', 'turns', 'moves', 'touch', 'angle', 'based', 'range', 'marks', 'tired', 'older', 'farms', 'spend', 'shoes', 'goods', 'chair', 'twice', 'cents', 'empty', 'alike', 'style', 'broke', 'pairs', 'count', 'enjoy', 'score', 'shore', 'roots', 'paint', 'heads', 'shook', 'serve', 'angry', 'crowd', 'wheel', 'quick', 'dress', 'share', 'alive', 'noise', 'solid', 'cloth', 'signs', 'hills', 'types', 'drawn', 'worth', 'truck', 'piano', 'upper', 'loved', 'usual', 'faces', 'drove', 'cabin', 'boats', 'towns', 'proud', 'court', 'model', 'prime', 'fifty', 'plans', 'yards', 'prove', 'tools', 'price', 'sheet', 'smell', 'boxes', 'raise', 'match', 'truth', 'roads', 'threw', 'enemy', 'lunch', 'chart', 'scene', 'graph', 'doubt', 'guide', 'winds', 'block', 'grain', 'smoke', 'mixed', 'games', 'wagon', 'sweet', 'topic', 'extra', 'plate', 'title', 'knife', 'fence', 'falls', 'cloud', 'wheat', 'plays'];

        let randomNumber = Math.floor(Math.random() * words.length);
        setTargetWord(words[randomNumber].toUpperCase().split(''));

        console.log(words[randomNumber]);
    }

    useEffect(() => {
        generateRandomWord();
    }, []);

    const getMeaning = async (searchWord) => {
        try {
            const response = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
            );
            return response.data[0];
        } catch (error) {
            console.error("Word not found:", error);
            return null;
        }
    }

    const [notifyMessage, setNotifyMessage] = useState(null);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentInput, setCurrentInput] = useState(0);
    const [showNotification, setShowNotification] = useState(false);

    const [gameplayArr, setGameplayArr] = useState(
        Array.from({ length: parentRows }, () => Array(inputsPerRow).fill({ letter: '', status: -1 }))
    );

    const resetGame = () => {
        setGameplayArr(Array.from({ length: parentRows }, () => Array(inputsPerRow).fill({ letter: '', status: -1 })));
        setCurrentRow(0);
        setCurrentInput(0);
        generateRandomWord();
    };

    const isWordValid = async (word) => {
        const meaning = await getMeaning(word);
        return meaning !== null;
    };

    useEffect(() => {
        const handleKeyPress = async () => {
            if (keyPressed && keyPressed !== "Enter" && keyPressed !== "Backspace") {
                if (currentInput < inputsPerRow) {
                    setGameplayArr(prevArr => {
                        const newArr = [...prevArr];
                        newArr[currentRow][currentInput] = { letter: keyPressed, status: -1 };
                        return newArr;
                    });
                    setCurrentInput(currentInput + 1);
                }
            } else if (keyPressed && keyPressed === "Backspace") {
                if (currentInput > 0) {
                    setGameplayArr(prevArr => {
                        const newArr = [...prevArr];
                        newArr[currentRow][currentInput - 1] = { letter: '', status: -1 };
                        return newArr;
                    });
                    setCurrentInput(currentInput - 1);
                }
            } else if (keyPressed && keyPressed === "Enter") {
                const isFullRow = gameplayArr[currentRow].every(cell => cell.letter !== '');

                if (isFullRow) {
                    const currentRowWord = gameplayArr[currentRow].map(cell => cell.letter).join('');
                    const validWord = await isWordValid(currentRowWord.toLowerCase());

                    if (validWord) {
                        const markedArr = gameplayArr[currentRow].map((cell, index) => ({
                            ...cell,
                            status: cell.letter.toLowerCase() === targetWord[index].toLowerCase() ? 1 : -1
                        }));

                        const targetWordCounts = targetWord.reduce((acc, letter) => {
                            acc[letter.toLowerCase()] = (acc[letter.toLowerCase()] || 0) + 1;
                            return acc;
                        }, {});

                        markedArr.forEach(cell => {
                            if (cell.status === -1 && targetWordCounts[cell.letter.toLowerCase()]) {
                                const targetCount = targetWordCounts[cell.letter.toLowerCase()];
                                const currentCount = markedArr.filter(c => c.letter.toLowerCase() === cell.letter.toLowerCase()).length;
                                if (currentCount <= targetCount) {
                                    cell.status = 0;
                                }
                            }
                        });

                        setGameplayArr(prevArr => {
                            const newArr = [...prevArr];
                            newArr[currentRow] = markedArr;
                            return newArr;
                        });

                        const countCorrect = markedArr.filter(cell => cell.status === 1).length;

                        if (countCorrect === inputsPerRow) {
                            setShowNotification(true);
                            setNotifyMessage("Correct. Great Job!");

                            let countdown = 5;
                            const countdownInterval = setInterval(() => {
                                if (countdown > 0) {
                                    setNotifyMessage(`Restarting in ${countdown}...`);
                                    countdown--;
                                } else {
                                    clearInterval(countdownInterval);
                                    setShowNotification(false);
                                    resetGame();
                                }
                            }, 1000);
                        } else {
                            if (currentRow === parentRows - 1) {
                                setShowNotification(true);
                                setNotifyMessage("You Lost. Game Over!");

                                let countdown = 3;
                                const countdownInterval = setInterval(() => {
                                    if (countdown > 0) {
                                        setNotifyMessage(`Restarting in ${countdown}...`);
                                        countdown--;
                                    } else {
                                        clearInterval(countdownInterval);
                                        setShowNotification(false);
                                        resetGame();
                                    }
                                }, 1000);
                            } else {
                                setCurrentRow(currentRow + 1);
                                setCurrentInput(0);
                            }
                        }
                    } else {
                        setShowNotification(true);
                        setNotifyMessage("Invalid Word");
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 1500);
                    }
                } else {
                    setShowNotification(true);
                    setNotifyMessage("Too Short");
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 1500);
                }
            }

            unloadKeyPress();
        };

        handleKeyPress();
    }, [keyPressed]);

    return (
        <div className="w-[500px] h-[500px] flex flex-col">
            {Array.from({ length: parentRows }).map((_, parentIndex) => (
                <div key={parentIndex} className="w-full h-[82px] flex flex-row justify-evenly items-center">
                    {Array.from({ length: inputsPerRow }).map((_, inputIndex) => {
                        const cell = gameplayArr[parentIndex][inputIndex];
                        return (
                            <div
                                key={inputIndex}
                                className={`w-[95px] h-[95%] ${cell.status === 1 ? 'bg-green-500' : (cell.status === 0 ? 'bg-yellow-400' : (parentIndex < currentRow ? "bg-slate-300" : "bg-white"))} border-2 ${cell.letter !== '' ? "border-black border-4" : "border-white border-2"} text-black text-[28px] font-bold font-new-amsterdam flex justify-center items-center`}
                            >
                                {cell.letter}
                            </div>
                        );
                    })}
                </div>
            ))}

            {showNotification && <Notify message={notifyMessage} />}
        </div>
    );
}

export default WordCase;