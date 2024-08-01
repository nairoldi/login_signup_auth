/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import UseAuth from "../../hooks/useAuth";

const activityLevels = [
	"Sedentary",
	"Lightly Active",
	"Moderately Active",
	"Very Active",
	"Extra Active",
];
const genders = ["Male", "Female", "Other"];

export default function MyInfo() {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [heightFeet, setHeightFeet] = useState(0);
	const [heightInches, setHeightInches] = useState(0);
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("");
	const [isEditing, setIsEditing] = useState({
		name: false,
		height: false,
		age: false,
		gender: false,
	});
	const axiosPrivate = UseAxiosPrivate();
	const refresh = useRefreshToken();

	const REGISTER_URL = "/login/login";

	useEffect(() => {
		const controller = new AbortController();
		async function getUser() {
			try {
				const response = await axiosPrivate.get("/user/myInfo", {
					signal: controller.signal,
				});
				setUserInfo(response.data);
				setName(response.data.name);
				setHeightFeet(response.data.heightFeet);
				setHeightInches(response.data.heightInches);
				setAge(response.data.age);
				setGender(response.data.gender);
				setLoading(false);
				console.log(JSON.stringify(response.data));
			} catch (e) {
				console.log("failed in users component");
				console.error(e);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		}

		getUser();

		return () => {
			controller.abort();
		};
	}, []);

	const handleUpdateField = async (fieldName, fieldValue) => {
		try {
			await axiosPrivate.patch("/user/updateUserField", {
				fieldName,
				fieldValue,
			});
			// Optionally update local state or show success message
		} catch (error) {
			console.error(`Failed to update ${fieldName}:`, error);
			// Handle error and show error message
		}
	};

	const handleEditClick = (field) => {
		setIsEditing((prev) => ({ ...prev, [field]: true }));
	};

	const handleSaveClick = (field) => {
		const fieldValue =
			field === "height" ? { heightFeet, heightInches } : eval(field);

		console.log(`Field: ${field}`);
		console.log(`FieldValue: ${fieldValue}`);
		console.log(`Gender State: ${gender}`);

		handleUpdateField(field, fieldValue);

		// Update local state directly
		setUserInfo((prev) => ({
			...prev,
			[field]: fieldValue,
		}));

		if (field === "height") {
			setUserInfo((prev) => ({
				...prev,
				heightFeet,
				heightInches,
			}));
		}

		setIsEditing((prev) => ({ ...prev, [field]: false }));
	};

	const handleChange = (e, field) => {
		const value = e.target.value;
		console.log(`Field: ${field}, Value: ${value}`);
		switch (field) {
			case "name":
				setName(value);
				break;
			case "heightFeet":
				setHeightFeet(value);
				break;
			case "heightInches":
				setHeightInches(value);
				break;
			case "age":
				setAge(value);
				break;
			case "gender":
				setGender(value);
				break;
			default:
				break;
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!userInfo) {
		return <div>Error loading user info.</div>;
	}

	const dummyWorkouts = {
		previousWorkout: {
			name: "Chest and Triceps",
			motions: ["Bench Press", "Tricep Dips", "Chest Fly"],
		},
		favoritedWorkout: {
			name: "Full Body Workout",
			motions: ["Squat", "Pull-Up", "Deadlift"],
		},
	};

	return (
		<article className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-bold text-purple-700 mb-6">
				{userInfo.name} Info
			</h2>

			{/* Login Streak and Weight Change Section */}
			<div className="flex space-x-4 mb-6">
				<div className="bg-gray-100 p-4 rounded-lg w-1/2 shadow">
					<h3 className="text-lg font-semibold text-purple-700">
						Login Streak
					</h3>
					<p className="text-gray-800 mt-2">Streak: 10 days</p>
					<p className="text-gray-800">Total Logins: 150</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg w-1/2 shadow">
					<h3 className="text-lg font-semibold text-purple-700">
						Weight Change
					</h3>
					<p className="text-gray-800 mt-2">
						Weight Lost/Gained: 5 lbs
					</p>
				</div>
			</div>

			{/* User Info Section */}
			<div className="grid grid-cols-1 gap-4 mb-6">
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					{isEditing.name ? (
						<>
							<input
								type="text"
								value={name}
								onChange={(e) => handleChange(e, "name")}
								className="mr-2 p-2 border border-gray-300 rounded"
							/>
							<button
								onClick={() => handleSaveClick("name")}
								className="p-2 bg-green-500 text-white rounded"
							>
								Save
							</button>
						</>
					) : (
						<p className="text-gray-800">
							<span className="font-semibold">Name:</span>{" "}
							{userInfo.name}
							<button
								onClick={() => handleEditClick("name")}
								className="ml-2 p-1 bg-blue-500 text-white rounded"
							>
								Edit
							</button>
						</p>
					)}
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Email:</span>{" "}
						{userInfo.email}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Username:</span>{" "}
						{userInfo.username}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					{isEditing.height ? (
						<>
							<input
								type="number"
								value={heightFeet}
								onChange={(e) => handleChange(e, "heightFeet")}
								className="mr-2 p-2 border border-gray-300 rounded"
							/>
							'
							<input
								type="number"
								value={heightInches}
								onChange={(e) =>
									handleChange(e, "heightInches")
								}
								className="ml-2 mr-2 p-2 border border-gray-300 rounded"
							/>
							"
							<button
								onClick={() => handleSaveClick("height")}
								className="ml-2 p-2 bg-green-500 text-white rounded"
							>
								Save
							</button>
						</>
					) : (
						<p className="text-gray-800">
							<span className="font-semibold">Height:</span>{" "}
							{userInfo.heightFeet}' {userInfo.heightInches}"
							<button
								onClick={() => handleEditClick("height")}
								className="ml-2 p-1 bg-blue-500 text-white rounded"
							>
								Edit
							</button>
						</p>
					)}
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					{isEditing.age ? (
						<>
							<input
								type="number"
								value={age}
								onChange={(e) => handleChange(e, "age")}
								className="mr-2 p-2 border border-gray-300 rounded"
							/>
							<button
								onClick={() => handleSaveClick("age")}
								className="p-2 bg-green-500 text-white rounded"
							>
								Save
							</button>
						</>
					) : (
						<p className="text-gray-800">
							<span className="font-semibold">Age:</span>{" "}
							{userInfo.age}
							<button
								onClick={() => handleEditClick("age")}
								className="ml-2 p-1 bg-blue-500 text-white rounded"
							>
								Edit
							</button>
						</p>
					)}
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					{isEditing.gender ? (
						<>
							<select
								value={gender}
								onChange={(e) => handleChange(e, "gender")}
								className="mr-2 p-2 border border-gray-300 rounded"
							>
								{genders.map((g) => (
									<option key={g} value={g}>
										{g}
									</option>
								))}
							</select>
							<button
								onClick={() => handleSaveClick("gender")}
								className="p-2 bg-green-500 text-white rounded"
							>
								Save
							</button>
						</>
					) : (
						<p className="text-gray-800">
							<span className="font-semibold">Gender:</span>{" "}
							{userInfo.gender}
							<button
								onClick={() => handleEditClick("gender")}
								className="ml-2 p-1 bg-blue-500 text-white rounded"
							>
								Edit
							</button>
						</p>
					)}
				</div>
			</div>

			{/* Previous Workouts and Favorited Workouts Section */}
			<div className="flex space-x-4 mb-6">
				<a
					href="/previous-workouts"
					className="bg-gray-100 p-4 rounded-lg shadow w-1/2 hover:bg-gray-200"
				>
					<h3 className="text-lg font-semibold text-purple-700">
						Previous Workouts
					</h3>
					<p className="text-gray-800 mt-2">
						Last Workout: {dummyWorkouts.previousWorkout.name}
					</p>
					<ul className="text-gray-800 list-disc list-inside">
						{dummyWorkouts.previousWorkout.motions.map(
							(motion, index) => (
								<li key={index}>{motion}</li>
							)
						)}
					</ul>
				</a>
				<a
					href="/favorited-workouts"
					className="bg-gray-100 p-4 rounded-lg shadow w-1/2 hover:bg-gray-200"
				>
					<h3 className="text-lg font-semibold text-purple-700">
						Favorited Workouts
					</h3>
					<p className="text-gray-800 mt-2">
						Last Favorited: {dummyWorkouts.favoritedWorkout.name}
					</p>
					<ul className="text-gray-800 list-disc list-inside">
						{dummyWorkouts.favoritedWorkout.motions.map(
							(motion, index) => (
								<li key={index}>{motion}</li>
							)
						)}
					</ul>
				</a>
			</div>

			{/* Goals and Settings Links */}
			<div className="flex space-x-4">
				<Link
					to="/goals"
					className="bg-purple-700 text-white text-center py-2 px-4 rounded-lg shadow w-1/2 hover:bg-purple-900"
				>
					Go to Goals
				</Link>
				<Link
					to="/settings"
					className="bg-purple-700 text-white text-center py-2 px-4 rounded-lg shadow w-1/2 hover:bg-purple-900"
				>
					Go to Settings
				</Link>
			</div>
		</article>
	);
}
