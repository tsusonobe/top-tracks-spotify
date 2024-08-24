import { useState, useEffect } from "react";
import { getAccessToken } from "../authorization";
import { getProfile, getTop } from "../requests";
import Items from "./Items";
import Loading from "./Loading";

const clientId = import.meta.env.VITE_CLIENT_ID;

export default function Dashboard(props) {
	const [accessToken, setAccessToken] = useState();
	const [tracks, setTracks] = useState();
	const [artists, setArtists] = useState();
	const [timeRange, setTimeRange] = useState("short_term");
	const [limit, setLimit] = useState("5");
	const [type, setType] = useState("tracks");
	const [profile, setProfile] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingItems, setIsLoadingItems] = useState(true);

	useEffect(() => {
		if (!accessToken) {
			const getToken = async () => {
				const token = await getAccessToken(clientId, props.code);
				setAccessToken(token);
				window.history.replaceState({}, document.title, "/top-tracks-spotify/");
			};
			getToken().catch(console.error);
		} else {
			const getUser = async () => {
				const profile = await getProfile(accessToken);
				setProfile({
					name: profile.display_name,
					userUrl: profile.external_urls.spotify,
					imageUrl: profile.images[0].url,
				});
			};
			getUser().catch(console.error);
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}, [accessToken, props.code]);

	useEffect(() => {
		if(accessToken){
			const getTopItems = async () => {
				const items = await getTop(accessToken, type, timeRange, limit);
				console.log(items);
				if (type === "tracks") {
					setTracks(
						items.map((track) => {
							return {
								id: track.id,
								name: track.name,
								trackUrl: track.external_urls.spotify,
								artist: track.artists,
								imageUrl: track.album.images[2].url,
								albumUrl: track.album.external_urls.spotify,
							};
						})
					);
				} else {
					setArtists(
						items.map((artist) => {
							return {
								id: artist.id,
								name: artist.name,
								artistUrl: artist.external_urls.spotify,
								imageUrl: artist.images[2].url,
							};
						})
					);
				}
			};			
			getTopItems().catch(console.error);

			setTimeout(() => {
				setIsLoadingItems(false);
			}, 1000);
		}
	}, [accessToken, type, timeRange, limit]);

	return (
		<>
			{(!isLoading && tracks) && 
				<div className="player-container">
					<iframe style={{borderRadius:12 + "px", border: 0}} src={`https://open.spotify.com/embed/track/${tracks[0].id}?utm_source=generator&theme=0`} width="100%" height="152" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
				</div>
			}
			{(isLoading || !tracks) && 
				<div className="player-container">
					<div className="loading-player">
						<div className="loading-img-player"/>
						<div className="loading-track-player"/>
						<div className="loading-artist-player"/>
					</div>
				</div>
			}
		

			<div className="grid-container">
				<aside>
					<div className="window-controls">
						<div className="window-controls-button"></div>
						<div className="window-controls-button"></div>
						<div className="window-controls-button"></div>
					</div>

					{isLoading ? <Loading type="profile"/> : (
						<div className="profile">
							<img
								className="profile-img"
								src={profile.imageUrl}
							/>
							<a
								href={profile.userUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<p className="profile-name">{profile.name}</p>
							</a>
						</div>
					)}

					<div className="parameters">
						<p className="parameter-title">metric</p>
						<div className="buttons-container">
							<div
								className="button-selected"
								onClick={(e) => {
									setIsLoadingItems(true);
									setType("tracks");
									e.target.className = "button-selected";
									e.target.nextElementSibling.className = "button";
								}}
							>
								tracks
							</div>
							<div
								className="button"
								onClick={(e) => {
									setIsLoadingItems(true);
									setType("artists");
									e.target.className = "button-selected";
									e.target.previousElementSibling.className = "button";
								}}
							>
								artists
							</div>
						</div>
					</div>

					<div className="parameters">
						<p className="parameter-title">length</p>
						<div className="buttons-container">
							<div
								className="button-selected"
								onClick={(e) => {
									setLimit("5");
									e.target.className = "button-selected";
									e.target.nextElementSibling.className = "button";
								}}
							>
								top 5
							</div>
							<div
								className="button"
								onClick={(e) => {
									setLimit("10");
									e.target.className = "button-selected";
									e.target.previousElementSibling.className = "button";
								}}
							>
								top 10
							</div>
						</div>
					</div>

					<div className="parameters">
						<p className="parameter-title">period</p>
						<div className="buttons-container">
							<div
								className="button-selected"
								onClick={(e) => {
									setTimeRange("short_term");
									e.target.className = "button-selected";
									e.target.nextElementSibling.className = "button";
								}}
							>
								last month
							</div>
							<div
								className="button"
								onClick={(e) => {
									setTimeRange("long_term");
									e.target.className = "button-selected";
									e.target.previousElementSibling.className = "button";
								}}
							>
								last year
							</div>
						</div>
					</div>
				</aside>

				<main>
					<h2 className="main-title">
						your top {limit} {type}
					</h2>
					<div className="items-container">
						{type === "tracks" &&
							!isLoadingItems &&
							tracks &&
							tracks.map((track, index) => (
								<Items
									type={type}
									key={index}
									index={index}
									track={track}
								/>
							))}
						{type === "artists" &&
							!isLoadingItems &&
							artists &&
							artists.map((artist, index) => (
								<Items
									type={type}
									key={index}
									index={index}
									artist={artist}
								/>
							))}

						{isLoadingItems &&
							Array.from(Array(Number(limit)).keys()).map((_, index) => (
								<Loading
									type={type}
									key={index}
									index={index}
								/>
							))}

					</div>
				</main>
			</div>
		</>
	);
}
