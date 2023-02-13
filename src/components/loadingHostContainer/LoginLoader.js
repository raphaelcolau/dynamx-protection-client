import { CircularProgress } from "@mui/material";


export default function LoginLoader(props) {
	const loadingContainer = {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		gap: "1rem",
	}

	return (
		<div style={loadingContainer}>
			<CircularProgress />
			<p> Connecting to {props.address}</p>
		</div>
	)
}