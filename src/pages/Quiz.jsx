import { useState, useContext, useEffect } from 'react';
// import HomeLayout from '../components/Layout';
import ScoreModal from '../components/ScoreModal';
import Loader from '../components/Loader.jsx';
import { useNavigate } from 'react-router-dom';
// import { integral_education_backend } from 'declarations/integral_education_backend';
// import AuthContext from '../context/context';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import ScoreCount from '../components/ScoreCount';
import Button, { WhiteButton } from '../components/Button';
import Points from '../components/Points';
import AnimationContainer from '../components/AnimationContainer';
import avatar from '../assets/avatar.png';
import { MenuItems } from '@headlessui/react';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import ChatBot from '../components/ChatBot.jsx';
// infinity;

const Quiz = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [showQuestion, setShowQuestion] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [isScoreModal, setIsScoreModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const navigate = useNavigate();
	const user = 'hello';
	// const { user } = useContext(AuthContext);
	// useEffect(() => {
	// 	if (!user) {
	// 		navigate('../index');
	// 	}
	// }, [user]);
	const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
	});
	const schema = {
		description: 'List of quiz questions',
		type: SchemaType.ARRAY,

		items: {
			type: SchemaType.OBJECT,
			properties: {
				numb: {
					type: SchemaType.NUMBER,
					description: 'The question number',
					nullable: false,
				},
				question: {
					type: SchemaType.STRING,
					description: 'The quiz question text',
					nullable: false,
				},
				answer: {
					type: SchemaType.STRING,
					description: 'The correct answer to the question',
					nullable: false,
				},
				options: {
					type: SchemaType.ARRAY,
					description: 'The list of possible answers for the question',
					items: {
						type: SchemaType.STRING,
					},
					nullable: false,
				},
			},
			required: ['numb', 'question', 'answer', 'options'],
		},
	};

	const generationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 1000,
		responseMimeType: 'application/json',
		responseSchema: schema,
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
				setLoading(true);
				const chatSession = model.startChat({
					generationConfig,
					history: [],
				});

				const result = await chatSession.sendMessage(prompt);
				if (result?.response) {
					const rawMessage = await result.response.text();
					// Preprocess the message to remove unwanted content like code block markers
					// const sanitizedMessage = rawMessage
					// 	.replace(/```json|```/g, '')
					// 	.trim();

					const parsedMessage = JSON.parse(rawMessage);
					console.log('Parsed Questions:', parsedMessage);
					setQuestions(() => parsedMessage);
					setLoading(false);
				} else {
					console.error('Invalid result response:', result);
					setQuestions([]);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error generating questions:', error);
				setLoading(false);
				setQuestions([]);
			}
		};

		generateQuestions();
	}, [prompt]);

	const handleNext = async () => {
		if (showQuestion < questions.length - 1) {
			setShowQuestion(showQuestion + 1);
			setSelectedOption(null); // Reset selected option for the next question
		} else {
			try {
				// const data = {name: user, point: Number(correctAnswer)}
				// console.log('data', data)
				// let name = user.toString();
				let point = Number(correctAnswer);
				// console.log('data', name, point)
				// const result = await integral_education_backend.putPoint(
				// 	{ name },
				// 	{ point }
				// );
				console.log('quiz result', { result: { name, point } });
				setIsScoreModal(true);
			} catch (error) {
				console.log('quiz error', error);
			}
			// Show score modal after the last question
		}
	};

	const checkAnswer = (option, answer) => {
		if (option === answer) {
			setCorrectAnswer(correctAnswer + 1);
		}
		setSelectedOption(option); // Mark the selected option
	};

	const handleCancle = () => {
		navigate('../index');
	};
	const handleComplete = async () => {
		navigate('../scores');
		// try{

		//   const result = await integral_education_backend.putPoint({name: user, point: Number(correctAnswer)})
		//   console.log('quiz result',result)
		// }catch(error){
		//   console.log('quiz error', error)
		// }
	};

	return loading ? (
		<Loader />
	) : (
		<>
			{/* <HomeLayout> */}
			<main className="bg flex flex-col justify-center  w-full md:w-3/4 mx-auto bg-white md:pb-4 mt-2 min-h-[400px] md:min-h-screen h-auto p-1 relative">
				<div className="h-fit w-full flex justify-between items-center mt-1">
					<button
						className=" hover:bg-gray-200 text-slate-800 text-2xl font-semibold  py-3 p-2 rounded-full transition-all duration-500 ease-in-out"
						onClick={() => navigate('/chat')}
					>
						<IoArrowBack />
					</button>
					<button
						// disabled={loading}
						className="text-blue-500 font-semibold  py-1 transition-all duration-500 ease-in-out"
						// onClick={() => navigate('/')}
					>
						{user}
					</button>
				</div>

				{/* Show current question */}
				<div className="flex flex-col h-full justify-center align-center mt-1">
					<div className="text-center">
						<div className="px-1 mt-4 text-primary/50">
							Score: {correctAnswer} / {questions?.length}
						</div>
						<h2 className="capitalize text-4xl md:text-6xl font-bold py-4 italic">
							Question <br /> {showQuestion + 1}
						</h2>
						<h3 className="text-lg font-bold py-4 italic">
							{questions[showQuestion]?.question}
						</h3>
					</div>

					{questions[showQuestion]?.options.map((option, i) => (
						<button
							key={i}
							onClick={() =>
								checkAnswer(option, questions[showQuestion]?.answer)
							}
							className={`border border-slate-500 my-2 hover:border-[#682B7E] hover:bg-[#682B7E] text-slate-800 hover:text-white font-semibold  py-3 p-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out
													
                  ${
										selectedOption === option
											? option === questions[showQuestion]?.answer
												? 'border-green-500 bg-green-500 text-white'
												: 'border-red-500'
											: 'hover:bg-gray-400 hover:text-white'
									}
                `}
							disabled={selectedOption !== null} // Disable after selecting an option
						>
							{option}
						</button>
					))}

					<div className="h-fit mt-4 p-2 flex justify-between items-center border-t border-primary/50">
						<p className="text-sm font-semibold w-fit whitespace-nowrap px-2">
							{showQuestion + 1} of {questions?.length}
						</p>
						<div className="w-full">
							<Button
								text="Next"
								onClick={handleNext}
								disabled={selectedOption === null}
								// Disable if no option is selected
							/>
						</div>
					</div>
				</div>
				<ChatBot className="absolute bottom-4 right-4" />
			</main>
			{/* </HomeLayout> */}
			<ScoreModal
				score={{
					correctAnswers: correctAnswer,
					totalQuestions: questions?.length,
				}}
				show={isScoreModal}
				setShow={setIsScoreModal}
				handleCancle={handleCancle}
				handleComplete={handleComplete}
			/>
		</>
	);
};

export default Quiz;

// // ctr c
// // dfx stop

// // dfx start
// // dfx deploy
