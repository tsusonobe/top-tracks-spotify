import { redirectToAuthCodeFlow } from "../authorization";

const clientId = import.meta.env.VITE_CLIENT_ID;

export default function Login() {
	return (
		<>
			<div className="login-div">
				<h1>top track generator</h1>
				<button className="login-button" onClick={() => {redirectToAuthCodeFlow(clientId)}}>Login with Spotify</button>
			</div>
		</>
	);
}
