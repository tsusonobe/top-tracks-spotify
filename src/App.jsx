import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

export default function App() {
	const code = new URLSearchParams(window.location.search).get("code");

	return (
		<>
			<div className="background">{code ? <Dashboard code={code}/> : <Login />}</div>
		</>
	);
}
