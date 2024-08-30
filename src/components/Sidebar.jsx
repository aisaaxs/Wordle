import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isLightMode, setIsLightMode }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const options = [
        { icon: isLightMode ? faMoon : faSun, label: isLightMode ? "dark mode" : "light mode" },
    ];

    return (
        <div className="absolute w-[60px] h-auto right-0 top-0 flex flex-col">
            {options.map((option, index) => (
                <div 
                    key={index}
                    className={`w-full h-[60px] flex justify-center items-center ${isLightMode ? "hover:bg-blue-300" : "hover:bg-blue-900"} cursor-pointer relative`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        if (index === 0) {
                            setIsLightMode();
                        }
                    }}
                >
                    <FontAwesomeIcon icon={option.icon} className={`${isLightMode ? "text-blue-950" : "text-blue-400"} text-[40px]`} />

                    {hoveredIndex === index && (
                        <div className={`absolute w-auto h-auto ${isLightMode ? "bg-blue-950 text-white border-blue-400" : "bg-blue-400 text-black border-blue-950"} text-[16px] capitalize font-serif font-bold right-[70px] flex flex-row justify-center items-center whitespace-nowrap px-[10px] py-[5px] rounded-[10px] select-none border-4`}>
                            {option.label}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;