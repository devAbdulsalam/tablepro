import AnimationContainer from './AnimationContainer';
// import TextHoverEffect from './TextHoverEffect';
import { FaBookOpenReader } from 'react-icons/fa6';
// import { Github, Linkedin } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="hidden relative mx-auto lg:flex w-full max-w-6xl flex-col items-center justify-center border-border border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 pt-16 pb-8 md:pb-0 lg:px-8 lg:pt-32">
			<div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 right-1/2 left-1/2 h-1.5 w-8 rounded-full bg-foreground"></div>

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimationContainer delay={0.1}>
					<div className="flex flex-col items-start justify-start md:max-w-[200px]">
						<div className="flex items-start">
							<FaBookOpenReader className="h-7 w-7 text-neutral-200" />
						</div>
						<p className="mt-4 text-start text-muted-foreground text-sm">
							Create your content with ease.
						</p>
						<span className="mt-4 flex items-center text-neutral-200 text-sm">
							Made by{' '}
							<Link
								to="https://devabdulsalam.vercel.app"
								className="ml-1 font-semibold hover:underline"
							>
								Abdulsalam
							</Link>
						</span>
						<div className="flex items-center gap-1 pt-2 text-muted-foreground">
							<Link to="#" target="_blank">
								<FaGithub className="size-4 hover:text-white" />
							</Link>
							<Link
								to="https://www.linkedin.com/in/abdulsalammmuftua"
								target="_blank"
							>
								<FaLinkedin className="size-4 hover:text-white" />
							</Link>
						</div>
					</div>
				</AnimationContainer>

				<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					<div className="md:grid md:grid-cols-2 md:gap-8">
						<AnimationContainer delay={0.2}>
							<div className="">
								<h3 className="font-medium text-base text-white">Product</h3>
								<ul className="mt-4 text-muted-foreground text-sm">
									<li className="mt-2">
										<Link
											to="#features"
											className="transition-all duration-300 hover:text-foreground"
										>
											Features
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Pricing
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Testimonials
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="/"
											className="transition-all duration-300 hover:text-foreground"
										>
											Integration
										</Link>
									</li>
								</ul>
							</div>
						</AnimationContainer>
						<AnimationContainer delay={0.3}>
							<div className="mt-10 flex flex-col md:mt-0">
								<h3 className="font-medium text-base text-white">
									Integrations
								</h3>
								<ul className="mt-4 text-muted-foreground text-sm">
									<li>
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Facebook
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Instagram
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Twitter
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											LinkedIn
										</Link>
									</li>
								</ul>
							</div>
						</AnimationContainer>
					</div>
					<div className="md:grid md:grid-cols-2 md:gap-8">
						<AnimationContainer delay={0.4}>
							<div className="">
								<h3 className="font-medium text-base text-white">Resources</h3>
								<ul className="mt-4 text-muted-foreground text-sm">
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Blog
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Support
										</Link>
									</li>
								</ul>
							</div>
						</AnimationContainer>
						<AnimationContainer delay={0.5}>
							<div className="mt-10 flex flex-col md:mt-0">
								<h3 className="font-medium text-base text-white">Company</h3>
								<ul className="mt-4 text-muted-foreground text-sm">
									<li className="">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											About Us
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Privacy Policy
										</Link>
									</li>
									<li className="mt-2">
										<Link
											to="#"
											className="transition-all duration-300 hover:text-foreground"
										>
											Terms & Conditions
										</Link>
									</li>
								</ul>
							</div>
						</AnimationContainer>
					</div>
				</div>
			</div>

			<div className="mt-8 w-full border-border/40 border-t pt-4 md:flex md:items-center md:justify-between md:pt-8">
				<AnimationContainer delay={0.6}>
					<p className="mt-8 text-muted-foreground text-sm md:mt-0">
						&copy; {new Date().getFullYear()} Icon INC. All rights reserved.
					</p>
				</AnimationContainer>
			</div>

			<div className="hidden h-[20rem] items-center justify-center md:flex lg:h-[20rem]">
				{/* <TextHoverEffect text="Writora" /> */}
			</div>
		</footer>
	);
};

export default Footer;
