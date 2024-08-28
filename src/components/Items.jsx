import { useLayoutEffect } from "react";
import { createRef } from "react";

export default function Items(props) {
	const ref = createRef();

	useLayoutEffect(() => {
		if (ref.current === null)
			return;
    if (ref.current.clientWidth < ref.current.scrollWidth) {
			ref.current.setAttribute("overflow", true);
			const translateDist = (ref.current.clientWidth - ref.current.scrollWidth) - 5;
			ref.current.style = `--translateDist: ${translateDist}px`;
    }
		else {
			ref.current.setAttribute("overflow", false);
		}
  }, [ref]);

	return (
		<>
			{props.type === "tracks" && (
				<div className="item">
					<p className="item-index">{props.index + 1}</p>
					<a
						href={props.track.albumUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="item-img"
							src={props.track.imageUrl}
						/>
					</a>
					<div className="item-info">
						<a
							className="item-name"
							href={props.track.trackUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<p className="item-name" ref={ref}>{props.track.name}</p>
						</a>
						<div className="item-artist-container">
							{props.track.artist.map((artist, index) => (
								<div key={index} className="item-artist">
									{index !== 0 && <span style={{marginRight: "0.1rem"}}>,</span>}
									<a
										className="item-artist"
										href={artist.external_urls.spotify}
										target="_blank"
										rel="noopener noreferrer"
										>	
										<p>{artist.name}</p>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			{props.type === "artists" && (
				<div className="item">
					<p className="item-index">{props.index + 1}</p>
					<img
						className="item-img"
						src={props.artist.imageUrl}
					/>
					<div className="item-info">
					<a
						className="item-name"
						href={props.artist.artistUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="item-name">{props.artist.name}</p>
					</a>
					</div>
				</div>
			)}
		</>
	);
}
