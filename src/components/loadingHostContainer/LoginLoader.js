import { CircularProgress } from "@mui/material";
import axios from "axios";

async function login(address, setConnecting, setError) {
    try {
        const response = await axios.post(`//${address}/auth/connect`, {});
        console.log(response.data);
        sessionStorage.setItem("apiAddress", address);
        setConnecting(false);
    } catch (error) {
        console.log(error);
        if (error.response.data) {
            setError(error.response.data);
        } else {
            setError(error.message);
        }
        setConnecting(false);
    }
}

export default function LoginLoader(props) {
	const loadingContainer = {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		gap: "1rem",
	}

    console.log("clicked")
    login(props.address, props.setConnecting, props.setError);

	return (
		<div className="undraggable" style={loadingContainer}>
			<CircularProgress />
			<p> Connecting to {props.address}</p>
		</div>
	)
}