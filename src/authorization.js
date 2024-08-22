const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export async function redirectToAuthCodeFlow(clientId) {
	const params = new URLSearchParams();
	params.append("response_type", "code");
	params.append("client_id", clientId);
	params.append("scope", "user-read-private user-read-email user-top-read");
	params.append("redirect_uri", redirectUri);

	document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
	const params = new URLSearchParams();
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", redirectUri);

	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: params,
	});

	const { access_token } = await result.json().catch(() => {console.log("getAccessToken error");});

	return access_token;
}
