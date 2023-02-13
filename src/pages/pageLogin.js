import PageComponent from "../components/page/page";
import * as React from 'react';
import Fab from '@mui/material/Fab';
import { Login } from "@mui/icons-material";
import InputHost from "../components/inputHost/inputHost";


export default function PageLogin() {
	const [connecting, setConnecting] = React.useState(false);
	const [address, setAddress] = React.useState("");

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
				<div>
					<p>Connecting to {address}...</p>
				</div>
			: 
				<div style={inputContainer}>
					{address ? <p style={{alignSelf: "flex-start"}}>Connecting to {address}</p>: <></>}
					<InputHost setAddress={setAddress} />

					<Fab 
						className="undraggable"
						variant="extended"
						size="medium"
						color="primary"
						aria-label="add"
						onClick={() => {
							setConnecting(true);
							console.log(address);
							setTimeout(() => {
								setConnecting(false);
							}, 3000);
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
