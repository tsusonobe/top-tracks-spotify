async function fetchWebApi(accessToken, endpoint, method, body) {
	const res = await fetch(`https://api.spotify.com/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		method,
		body: JSON.stringify(body),
	});

	return await res.json();
}

// Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export async function getTop(accessToken, type, time_range, limit) {
	return (
		await fetchWebApi(
			accessToken,
			`v1/me/top/${type}?time_range=${time_range}&limit=${limit}`,
			"GET"
		)
	).items;
}

export async function getProfile(accessToken) {
	return await fetchWebApi(accessToken, "v1/me", "GET");
}
