import { useState } from 'react';
import {
	GoogleGenerativeAI,
	// HarmCategory,
	// HarmBlockThreshold,
} from '@google/generative-ai';
// import { GoogleAIFileManager } from '@google/generative-ai/server';
import ChatInput from '../components/ChatInput';
import ChatBody from '../components/ChatBody';

const Chat = () => {
	const [language, setLanguage] = useState(false);
	const [text, setText] = useState('');
	const [chats, setChats] = useState([
		{ sender: 'ai', message: 'Hello! How can I assist you today?' },
	]);
	const handleLanguage = () => {
		setLanguage(!language);
	};
	// Check for browser compatibility
	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	const handleVoiceInput = () => {
		if (SpeechRecognition) {
			const recognition = new SpeechRecognition();
			recognition.lang = 'en-US'; // Set the language for recognition
			recognition.start(); // Start listening to the voice input

			// When speech recognition gets the result
			recognition.onresult = (event) => {
				const voiceText = event.results[0][0].transcript; // Get the first result
				setText(voiceText); // Update the text state with the recognized text
			};

			// Handle any errors
			recognition.onerror = (event) => {
				console.error('Speech recognition error:', event.error);
			};

			// Optional: Stop recognition after capturing the input
			recognition.onspeechend = () => {
				recognition.stop(); // Automatically stop listening once the speech ends
			};
		} else {
			console.error('Speech Recognition API is not supported in this browser.');
		}
	};

	// const { user } = useContext(AuthContext);
	// const name = user.user?.name;

	const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
	});

	const generationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 1000,
		responseMimeType: 'text/plain',
	};

	const handleGenerateContent = async () => {
		try {
			if (!text.trim()) return;
			setChats((prev) => [...prev, { sender: 'me', message: text }]);
			const chatSession = model.startChat({
				generationConfig,
				history: [],
			});
			const result = await chatSession.sendMessage(text);
			setText('');
			const message = result.response.text();
			setChats((prev) => [...prev, { sender: 'ai', message }]);
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};

	return (
		<main className="p-1 md:px-6 pt-2 space-y-1 relative">
			<div className="flex justify-between px-5 py-1  text-xl items-center bg-green-500 text-white w-full">
				<div className="space-x-5 flex items-center">
					<a href="./dashboard">
						<i className="fa-solid fa-arrow-left"></i>
					</a>
					<div className="space-y-0">
						<h1 className="text-lg font-bold mb-0 p-0">IChat</h1>
						<p className="text-sm text-gray-100 mt-0 p-0">Learning together</p>
					</div>
				</div>
				<div className="space-x-5  text-white">
					<i className="fa-solid fa-phone cursor-pointer"></i>
					<i className="fa-solid fa-video-camera cursor-pointer"></i>
					<i
						className="fa-solid fa-language language cursor-pointer"
						onClick={handleLanguage}
					></i>
				</div>
				<div
					className={`absolute bg-white px-5 rounded py-3 text-green-600 text-sm right-2 top-12 mt-14 language-bar ${
						language ? `block` : `hidden`
					}`}
				>
					<ul className="space-y-3">
						<li
							className="hover:text-green-400 cursor-pointer"
							onClick={handleLanguage}
						>
							Hausa
						</li>
						<li
							className="hover:text-green-400  cursor-pointer"
							onClick={handleLanguage}
						>
							English
						</li>
					</ul>
				</div>
			</div>
			{/* <!-- Main chat area --> */}
			<div className="flex flex-col w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px]">
				{/* <!-- Chat messages --> */}

				<ChatBody chats={chats} />
				{/* <!-- Input field and voice input button --> */}
				<ChatInput
					handleGenerateContent={handleGenerateContent}
					handleVoiceInput={handleVoiceInput}
					setText={setText}
					text={text}
				/>
			</div>
		</main>
	);
};
// https://bot.dialogflow.com/e8de966e-65ae-41c3-872d-9d7fc279feb3
export default Chat;
