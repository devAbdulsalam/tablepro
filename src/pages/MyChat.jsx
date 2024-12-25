/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
// const { CreateMLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');
import { CreateMLCEngine } from '@mlc-ai/web-llm';

function App() {
	const [messages, setMessages] = useState([
		{ role: 'system', content: 'You are a helpful AI assistant.' },
	]);
	const [userInput, setUserInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		const initializeEngine = async () => {
			const initProgressCallback = (progress) =>
				console.log('Loading Progress:', progress);
			const selectedModel = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

			const engineInstance = await CreateMLCEngine(selectedModel, {
				initProgressCallback,
			});

			setEngine(engineInstance);
		};

		initializeEngine();
	}, []);

	const handleSend = async () => {
		if (!userInput.trim() || !engine) {
			console.log('User input is empty or engine is not initialized.');
			return;
		}

		const updatedMessages = [
			...messages,
			{ role: 'user', content: userInput.trim() },
		];
		setMessages(updatedMessages);
		setUserInput('');
		setIsLoading(true);

		try {
			const reply = await engine.chat.completions.create({
				messages: updatedMessages,
			});

			setMessages([
				...updatedMessages,
				{ role: 'assistant', content: reply.choices[0].message.content },
			]);
		} catch (error) {
			console.error('Error generating reply:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold text-center mb-4">AI Chat App</h1>
				<div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`${
								msg.role === 'user' ? 'text-right' : 'text-left'
							} mb-2`}
						>
							<div
								className={`inline-block px-4 py-2 rounded-lg ${
									msg.role === 'user'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 text-gray-900'
								}`}
							>
								{msg.content}
							</div>
						</div>
					))}
				</div>
				<div className="flex items-center">
					<input
						type="text"
						className="flex-1 border rounded-lg p-2 mr-2"
						placeholder="Type your message..."
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSend()}
						disabled={isLoading}
					/>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
						onClick={handleSend}
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Send'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
