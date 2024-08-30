const Notify = ({ message, isLightMode }) => {
    return (
        <div className={`absolute z-50 w-auto max-w-[600px] px-[30px] min-h-[100px] rounded-[10px] ${isLightMode ? "bg-blue-950 text-white" : "bg-blue-400 text-black"} top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)] flex justify-center items-center font-new-amsterdam text-[28px] font-bold text-center`}>
            {message}
        </div>
    )
}

export default Notify;