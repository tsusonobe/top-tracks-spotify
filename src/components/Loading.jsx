export default function Loading(props) {
	return (
		<>
			{props.type === "profile" && (
				<div className="profile">
					<div className="loading-profile-img"/>
					<div className="loading-profile-name"/>
				</div>
			)}
				
      {props.type === "tracks" && (
				<div className="item">
					<p className="item-index">{props.index + 1}</p>
					<div className="loading-item-img"/>
					<div className="loading-item-info">
            <div className="loading-item-name"/>
						<div className="loading-artist-name"/>
					</div>
				</div>
			)}
			{props.type === "artists" && (
				<div className="item">
					<p className="item-index">{props.index + 1}</p>
					<div className="loading-item-img"/>
					<div className="loading-item-info">
            <div className="loading-item-name"/>
					</div>
				</div>
			)}
		</>
	);
}
