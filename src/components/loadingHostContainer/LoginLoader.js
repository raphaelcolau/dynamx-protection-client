import { CircularProgress } from "@mui/material";
import React from "react";

export default function LoginLoader(props) {
	const loadingContainer = {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		gap: "1rem",
	}

	return (
		<div className="undraggable" style={loadingContainer}>
			<CircularProgress />
			<p> Connecting to {props.address}</p>
		</div>
	)
}