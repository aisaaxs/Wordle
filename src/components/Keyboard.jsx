import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const Keyboard = ({ onKeyPress }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    const keys = {
        firstRow: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        secondRow: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        thirdRow: ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"]
    };

    const rowStyle = (rowLength, isThirdRow) => ({
        width: isThirdRow
            ? `calc((100% / ${rowLength}) - 11px)`
            : `calc((100% / ${rowLength}) - 5px)`
    });

    useEffect(() => {
        const timer = setTimeout(() => setHasLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = (key) => {
        if (onKeyPress) {
            onKeyPress(key);
        }
    };

    return (
        <div
            className={`w-[800px] max-w-[800px] min-w-[500px] h-[200px] flex flex-col ${hasLoaded ? "animate-KeyboardFadeIn" : ""}`}
            style={{
                animation: hasLoaded ? "KeyboardFadeIn 2s ease-out" : "none"
            }}
        >
            <div className="w-full h-[33.5%] flex flex-row items-center justify-evenly">
                {keys.firstRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.firstRow.length, false)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 h-[95%] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
                        onClick={() => handleClick(key)}
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full h-[33.5%] flex flex-row items-center justify-evenly">
                {keys.secondRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.secondRow.length, false)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 h-[95%] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
                        onClick={() => handleClick(key)}
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full h-[33.5%] flex flex-row items-center justify-evenly">
                {keys.thirdRow.map(key => (
                    <div
                        key={key}
                        style={{
                            width: key === "Enter" || key === "Backspace"
                                ? `calc(${rowStyle(keys.thirdRow.length, true).width} + 26px)`
                                : rowStyle(keys.thirdRow.length, true).width
                        }}
                        className="group flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 h-[95%] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
                        onClick={() => handleClick(key)}
                    >
                        {key === "Backspace" ? (
                            <FontAwesomeIcon icon={faDeleteLeft} className="text-black group-active:text-white text-[28px] select-none" />
                        ) : (
                            key
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
