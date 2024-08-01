import { Outlet } from "react-router-dom";

export default function Layout() {
	/*
    outlet componet reprensts all the children of the layout component so anything nested inside the layout component is represented
    by the outlet, that allows you to apply more things to your overall app 
    */
	return (
		<main className="App">
			<Outlet />
		</main>
	);
}
