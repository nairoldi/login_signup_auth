/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className="bg-purple-700 p-4">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between">
					<div className="flex-shrink-0 text-white">Motion Mastery</div>
					<div className="hidden md:block">
						<ul className="flex space-x-4">
							<li>
								<Link to="/home" className="text-white hover:text-gray-300">
									Home
								</Link>
							</li>
							<li>
								<Link to="/myInfo" className="text-white hover:text-gray-300">
									My Info
								</Link>
							</li>
							<li>
								<Link to="/workouts" className="text-white hover:text-gray-300">
									Workouts
								</Link>
							</li>
							<li>
								<Link to="/stats" className="text-white hover:text-gray-300">
									Stats
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
