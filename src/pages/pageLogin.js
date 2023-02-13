import PageComponent from "../components/page/page";
import * as React from 'react';
import Fab from '@mui/material/Fab';
import { Login } from "@mui/icons-material";
import InputHost from "../components/inputHost/inputHost";
import LoginLoader from "../components/loadingHostContainer/LoginLoader";
import LoginAdapter from "../adapters/auth";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
	const [connecting, setConnecting] = React.useState(false);
	const [address, setAddress] = React.useState("");
	const [error, setError] = React.useState("");
	const navigate = useNavigate();

	const hostContainer = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 'calc(90% - 25px)', // 25px is the height of the menubar
		'WebkitAppRegion': 'drag',
		'& > *': {
			'WebkitAppRegion': 'no-drag',
		},
	}

	const inputContainer = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		gap: '10px',
	}
  
	return (
		<PageComponent>
			<div style={hostContainer}>
			{connecting ?
				<LoginLoader address={address} setConnecting={setConnecting} setError={setError}/>
			: 
				<div style={inputContainer}>
					<InputHost setAddress={setAddress} address={address} error={error} setError={setError} />

					<Fab 
						className="undraggable"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="add"
						{...{disabled: (address === "" || address === undefined || address === null)}}
						onClick={() => {
							if (address !== "" && address !== undefined && address !== null) {
								setConnecting(true);
								if (LoginAdapter(address, setConnecting, setError)) {
									navigate("/home");
								}
							}
						}}	
						>
						<Login sx={{mr: 1}} />
						Connect
					</Fab>
				</div>
			}
			</div>

		</PageComponent>
	);
}
