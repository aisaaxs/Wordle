const Keyboard = () => {
    const keys = {
        firstRow: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        secondRow: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        thirdRow: ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"]
    };

    const rowStyle = (rowLength) => ({
        width: `calc((100% / ${rowLength}) - 5px)`
    });
    
    return (
        <div className="border-2 border-red-500 w-[800px] h-[250px] flex flex-col">
            <div className="w-full h-[33.5%] border-[1px] border-red-500 flex flex-row items-center justify-evenly">
                {keys.firstRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.firstRow.length)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-300 h-[90%]"
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full h-[33.5%] border-[1px] border-red-500 flex flex-row items-center justify-evenly">
                {keys.secondRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.secondRow.length)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-300 h-[90%]"
                    >
                        {key}
                    </div>
                ))}
            </div>

            <div className="w-full h-[33.5%] border-[1px] border-red-500 flex flex-row items-center justify-evenly">
                {keys.thirdRow.map(key => (
                    <div
                        key={key}
                        style={rowStyle(keys.thirdRow.length)}
                        className="flex justify-center items-center text-black text-[28px] font-bold font-new-amsterdam bg-slate-300 h-[90%]"
                    >
                        {(key === "Backspace" || key === "Enter") ? (key === "Backspace" ? "" : (key === "Enter" ? "" : key)) : key}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Keyboard;