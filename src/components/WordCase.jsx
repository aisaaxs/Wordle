import { useState, useEffect } from 'react';
import Notify from './Notify';

const WordCase = ({ keyPressed, unloadKeyPress }) => {
    const parentRows = 6;
    const inputsPerRow = 5;

    const targetWord = ['A', 'P', 'P', 'L', 'E'];

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
    };

    useEffect(() => {
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
                const currentRowCells = gameplayArr[currentRow];

                const markedArr = currentRowCells.map((cell, index) => ({
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

                    let countdown = 10;
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
                setNotifyMessage("Too Short");
                setTimeout(() => {
                    setShowNotification(false);
                }, 1500);
            }
        }

        unloadKeyPress();
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