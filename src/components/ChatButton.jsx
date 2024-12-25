/* eslint-disable react/prop-types */
const ChatButton = ({ chat, isReading, handleReadText, handleStopReading }) => {
	return (
		<>
			{isReading && isReading === chat.index ? (
				<button
					onClick={handleStopReading}
					className="ml-2 p-2 px-3 bg-green-400 text-white rounded-full pauseBtn"
					aria-label="Pause reading"
				>
					⏸︎
				</button>
			) : (
				<button
					onClick={() => handleReadText(chat.index, chat.message)}
					className="ml-2 p-1 md:p-2 bg-green-500 text-white rounded-full playBtn"
					aria-label={`Start reading ${chat.index}`}
				>
					▶
				</button>
			)}
		</>
	);
};

export default ChatButton;
