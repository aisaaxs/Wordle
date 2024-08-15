const Notify = ({ message }) => {
    return (
        <div className="absolute z-50 w-auto px-[30px] h-[100px] rounded-[10px] bg-blue-950 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[10px_10px_10px_rgba(0,0,0,1)] flex justify-center items-center text-white font-new-amsterdam text-[28px] font-bold">
            {message}
        </div>
    )
}

export default Notify;