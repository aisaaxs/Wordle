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
        flex: isThirdRow
            ? `1 1 calc((100% / ${rowLength}) - 11px)`
            : `1 1 calc((100% / ${rowLength}) - 5px)`
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
            className={`w-full max-w-[800px] min-w-[500px] h-[200px] flex flex-col ${hasLoaded ? "animate-KeyboardFadeIn" : ""}`}
            style={{
                animation: hasLoaded ? "KeyboardFadeIn 2s ease-out" : "none"
            }}
        >
            <div className="w-full min-h-[33.5%] flex flex-row items-center justify-evenly gap-x-[2px]">
                {keys.firstRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.firstRow.length, false)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 h-[95%] min-h-[60px] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
                        onClick={() => handleClick(key)}
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full min-h-[33.5%] flex flex-row items-center justify-evenly gap-x-[2px]">
                {keys.secondRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.secondRow.length, false)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 min-h-[60px] h-[95%] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
                        onClick={() => handleClick(key)}
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full min-h-[33.5%] flex flex-row items-center justify-evenly gap-x-[2px]">
                {keys.thirdRow.map(key => (
                    <div
                        key={key}
                        style={{
                            flex: key === "Enter" || key === "Backspace"
                                ? `1 1 calc((100% / ${keys.thirdRow.length}) + 26px)`
                                : rowStyle(keys.thirdRow.length, true).flex
                        }}
                        className="group flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-200 min-h-[60px] h-[95%] cursor-pointer hover:bg-slate-400 active:bg-black active:text-white select-none"
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