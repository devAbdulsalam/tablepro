import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import ScoreCount from '../components/ScoreCount';
import Button, { WhiteButton } from '../components/Button';
import Points from '../components/Points';
import AnimationContainer from '../components/AnimationContainer';
import avatar from '../assets/avatar.png';
import {
	GoogleGenerativeAI,
	// HarmCategory,
	// HarmBlockThreshold,
} from '@google/generative-ai';
// infinity;

function Home() {
	const navigate = useNavigate();
	const [questions, setQuestions] = [null];
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

	const mode = 'easy';
	let prompt = `

    let questions = [
		{
        numb: 1,
        question: "What is corruption?",
        answer: "C. A complex social, political, and economic phenomenon.",
        options: [
            "A. A simple economic issue.",
            "B. A legal process.",
            "C. A complex social, political, and economic phenomenon.",
            "D. A type of business activity."
        ]
    },
	Generate 5  Json format ${mode} questions based on Global Resource for Anti-Corruption Education and Youth Empowerment or content below 
2. And what exactly is “corruption”?
Corruption is a complex social, political and economic phenomenon that
affects all countries. Corruption undermines democratic institutions, slows
economic development and contributes to governmental instability.
Corruption attacks the foundation of democratic institutions by distorting
electoral processes, perverting the rule of law and creating bureaucratic
quagmires whose only reason for existing is the solicitation of bribes.
Economic development is stunted because foreign direct investment is
discouraged and small businesses within the country often find it impossible
to overcome the "start-up costs" required because of corruption.
8
At present, there is no unified and collectively accepted definition of
corruption; therefore, the interpretations of the phenomenon vary.
However, usually there are 3 elements in a corrupt act:
1) Authority: someone has the power.
2) Abuse: this someone abuses the power.
3) Benefit: this someone obtains any sort of undue benefit.
`;
	useEffect(() => {
		const generateQuestions = async () => {
			try {
				const chatSession = model.startChat({
					generationConfig,
					history: [],
				});

				const result = await chatSession.sendMessage(prompt);
				if (result?.response) {
					const message = await result.response.JSON();
					const messageJson = await result.response.Json();
					console.log('Fetched message:', message);
					console.log('Fetched messageJson:', messageJson);
					setQuestions(Array.isArray(message) ? message : []);
				} else {
					console.error('Invalid result response:', result);
					setQuestions([]);
				}
			} catch (error) {
				console.error('Error generating questions:', error);
				setQuestions([]);
			}
		};

		generateQuestions();
	}, [prompt]);

	// useEffect(() => {
	// 	const generateQuestions = async () => {
	// 		const chatSession = model.startChat({
	// 			generationConfig,
	// 			history: [],
	// 		});
	// 		const result = await chatSession.sendMessage(prompt);
	// 		// if (result) {
	// 		console.log('result', result);
	// 		const message = result.response.JSON();
	// 		console.log('message', message);
	// 		setQuestions(message);
	// 		// }
	// 	};
	// 	generateQuestions();
	// }, []);
	return (
		<>
			{/* Home page */}
			<div className="flex flex-col justify-center items-center w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto">
				<div className="animate text-center">
					<AnimationContainer delay={0.6}>
						<h2 className="capitalize text-4xl md:text-6xl font-bold pt-4 italic">
							Hi IForce
						</h2>
					</AnimationContainer>
					<AnimationContainer delay={0.8}>
						<h3 className="text-sm font-bold pt-2 pb-4 italic">
							Learning about the effect corruptions and crime
						</h3>
					</AnimationContainer>
				</div>
			</div>
			{/* Get Started */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto">
				<AnimationContainer
					delay={0.6}
					className="animate text-center flex-1 h-full"
				>
					<h2 className="capitalize text-4xl md:text-6xl font-bold pt-4 italic">
						Hi IForce
					</h2>
				</AnimationContainer>
				<div className="h-fit">
					<Button text="Get Started" onClick={() => navigate('/chat')} />
				</div>
			</div>
			{/* // Test level */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto relative">
				<div className="animate text-center flex-1 h-full pb-4">
					<h2 className="capitalize text-lg md:text-6xl font-bold  py-4 italic">
						Choose <br className="" /> text level
					</h2>
				</div>
				<AnimationContainer
					delay={0.6}
					className="py-4 h-full flex-1 space-y-1"
				>
					<WhiteButton text="Easy" />
					<WhiteButton text="Intermediate" />
					<WhiteButton text="Hard" />
				</AnimationContainer>
				<div>
					<p className="p-2 underline font-bold text-center">Read Articles</p>
				</div>
				<button
					onClick={() => navigate('/chat')}
					className="absolute bottom-3 right-3 rounded-full p-2 bg-green-500 text-white text-3xl font-bold"
				>
					<IoChatbubbleEllipsesOutline />
				</button>
			</div>
			{/* // Article */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Iforce
					</button>
				</div>
				<div className="animate flex-1 h-full">
					<h2 className="text-sm font-bold pt-2 pb-4 italic text-center">
						IForce
					</h2>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Consequuntur magnam eligendi incidunt nisi nam inventore placeat
						totam sunt sequi temporibus ut esse, est architecto non, recusandae
						quos explicabo earum dolorum?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
						veniam aut, dolore praesentium amet corrupti facere incidunt ducimus
						minus rerum est reprehenderit quaerat. Aperiam magnam perferendis
						iure quos velit eligendi?
					</p>
				</div>
			</div>
			{/* // // Information */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto p-1">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Iforce
					</button>
				</div>
				<div className="animate text-center flex-1 h-full ">
					<div>
						<h2 className="capitalize text-4xl md:text-6xl font-bold pt-4 italic">
							Hi IForce
						</h2>
						<h3 className="text-lg font-bold pb-4 italic">To get Staterd</h3>
					</div>
					<div className="text-left py-4">
						<ul>
							<li>Learn about the effect corruptions and crime</li>
							<li>Learn about the effect corruptions and crime</li>
							<li>Learn about the effect corruptions and crime</li>
						</ul>
					</div>
				</div>
				<div className="h-fit">
					<Button text="Continue" onClick={() => navigate('/chat')} />
					<button
						// disabled={loading}
						className="border border-slate-500 my-2 hover:border-blue-300 hover:bg-blue-300 text-slate-800 hover:text-white font-semibold  py-3 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						// onClick={handleSubmit}
					>
						Exit
					</button>
				</div>
			</div>
			{/* // // Question 1 */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto p-1">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Iforce
					</button>
				</div>
				{questions?.length > 0 &&
					questions?.map((item, index) => {
						<div key={index} className="animate text-center flex-1 h-full ">
							<div>
								<h2 className="capitalize text-4xl md:text-6xl font-bold py-4 italic">
									Question <br /> {index + 1}
								</h2>
								<h3 className="text-lg font-bold py-4 italic">
									{item.question}
								</h3>
							</div>
							<div className="text-left py-4">
								<button
									// disabled={loading}
									className="border border-slate-500 my-2 hover:border-[#682B7E] hover:bg-[#682B7E] text-slate-800 hover:text-white font-semibold  py-3 p-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
									// onClick={handleSubmit}
								>
									A: Learn about the effect corruptions and crime
								</button>
							</div>
						</div>;
					})}

				<div className="h-fit">
					<Button text="Next" onClick={() => navigate('/chat')} />
				</div>
			</div>
			{/* // // Score */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto p-1">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Iforce
					</button>
				</div>
				<div className="animate text-center flex-1 h-full ">
					<div>
						<ScoreCount score={500} steps={10} interval={10} />
						<h3 className="text-lg font-bold italic">You score 5 of 20</h3>
					</div>
					<div className="text-left py-4">
						<image src="" alt="animated image" />
					</div>
				</div>
				<div className="h-fit">
					<Button text="Try again" onClick={() => navigate('/chat')} />
					<button
						// disabled={loading}
						className="border border-slate-500 my-2 hover:border-blue-300 hover:bg-blue-300 text-slate-800 hover:text-white font-semibold  py-3 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						// onClick={handleSubmit}
					>
						My Points
					</button>
				</div>
			</div>
			{/* // // Points */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto p-1">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Ranks
					</button>
				</div>
				<div className="animate text-center flex-1 h-full ">
					<div>
						<Points score={5} steps={10} interval={100} />
					</div>
				</div>
				<div className="h-fit space-y-1">
					<Button text="Convert my points" onClick={() => navigate('/chat')} />
					<WhiteButton text="Home" onClick={() => navigate('/')} />
				</div>
			</div>
			{/* // // Leaderboard */}
			<div className="flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:p-4 mt-2 min-h-[400px] md:min-h-[570px] h-auto p-2">
				<div className="h-fit w-full flex justify-between items-center ">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<h2 className="font-semibold text-center">Leaderboard</h2>
					<button
						// disabled={loading}
						className="invisible text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						Iforce
					</button>
				</div>
				<div className="bg-gradient-to-r from-[#9B317B] to-[#682B7E]  via-[#682B7E]  hover:to-[#9B317B]  text-white px-4 hover:text-white font-semibold  py-3 w-full flex flex-col items-center justify-center rounded-md transition-all duration-500 ease-in-out">
					<div className="animate text-center flex-1 h-full py-4">
						<img src={avatar} alt="avatar" className="w-20 h-20 mx-auto p-2" />
						<p className="text-sm">Abdulsalam</p>
						<h3 className="text-xl font-bold italic pt-4">17 points</h3>
					</div>
				</div>
				<div className="flex justify-end py-2 border-none ">
					<select name="days" id="days">
						<option value="today">Today</option>
						<option value="this week">This week</option>
						<option value="this month">This month</option>
						<option value="overall">Overall</option>
					</select>
				</div>
				<AnimationContainer delay={0.6} className="h-fit">
					<div className="flex p-1 bg-gray-100 rounded-md space-x-2 my-1 px-2 justify-between items-center">
						<div className="flex justify-center items-center">
							<p className="text-sm font-bold pr-1">1</p>
							<img
								src={`https://ui-avatars.com/api/?name=${'Abdulsalam'}&color=fff&font-size=0.33&rounded=true`}
								alt="avatar"
								className="w-16 h-16 mx-auto p-1 rounded-full"
							/>
							<p className="text-sm font-bold ml-1">Abdulsalam</p>
						</div>
						<div>
							<h3 className="text-lg font-bold italic">17 points</h3>
						</div>
					</div>
					<WhiteButton text="Load more" onClick={() => navigate('/')} />
				</AnimationContainer>
			</div>
		</>
	);
}

export default Home;
