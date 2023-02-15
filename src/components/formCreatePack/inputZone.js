import * as React from 'react';
import { TextField, Grid, Fab, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import validPack from './validPack';
import axios from 'axios';
import createPack from '../../adapters/createPack';
import SnackBarPack from './snackBar';


export default function InputZone(props) {
    const [name, setName] = React.useState("");
    const [gameDir, setGameDir] = React.useState("");
    const [error, setError] = React.useState(null);
    const [helperText, setHelperText] = React.useState(" ");
    const [disabled, setDisabled] = React.useState(validPack(props.pack));
    const [timeoutId, setTimeoutId] = React.useState(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [downloadLink, setDownloadLink] = React.useState(null);

    React.useEffect(() => {
        setDisabled(validPack(props.pack));
        setName(props.pack.rep_id);
        setGameDir(props.pack.game_dir);
    }, [props.pack]);

    const checkName = (name) => {
        if (name && name !== "" && name.length > 0) {
            const address = sessionStorage.getItem("apiAddress");
            axios.post(`//${address}/checks/packname`, {
                packName: name,
            })
            .then((response) => {
                if (response.data === "OK") {
                    props.setPack({
                        ...props.pack,
                        rep_id: name,
                    });
                    setError(null);
                    setHelperText(" ");
                } else {
                    props.setPack({
                        ...props.pack,
                        rep_id: "",
                    });
                    setError(true);
                    setHelperText(response.data);
                }
            })
        }
    };

    const handleDirChange = (event) => {
        props.setPack({
            ...props.pack,
            game_dir: event.target.value,
        });
        setGameDir(event.target.value);
    };

    const inputContainer = {
        width: '95%',
        height: '28vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    return (
        <div style={inputContainer}>
            <Grid container spacing={0} style={{gap: "0rem 0"}}>
                <Grid item xs={12}>

                    <TextField 
                        value={name}
                        style={{width: "100%"}}
                        variant="outlined"
                        label="Package Name"
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(null);
                            setHelperText(" ");
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            setTimeoutId(setTimeout(() => {
                                checkName(e.target.value);
                            }, 300));
                        }}
                        error={error}
                        helperText={helperText}
                        onKeyDown={(e) => {
                            if(!/^[a-zA-Z0-9-]+$/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                </Grid>
                <Grid item xs={9}>
                    <TextField 
                        style={{width: "90%"}}
                        value={gameDir}
                        variant="outlined"
                        label="Root folder"
                        placeholder={`e.g. "MyMod" don't include the dot`}
                        onKeyDown={(e) => {
                            if(!/^[a-zA-Z0-9_\-.]+$/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            handleDirChange(e);
                        }}
                    />
                </Grid>
                <Grid item xs={3} style={{
                    display: 'flex',
                    justifyContent: props.loading ? 'center' : 'flex-end',
                    alignItems: 'center',
                }}>

                    <Box sx={{position: "relative"}}>
                        <Fab 
                            style={{color: 'black'}}
                            color="primary"
                            aria-label="add"
                            {...((!props.loading && disabled) ? {} : {disabled: true})}
                            {...(props.loading ? {} : {variant: "extended"})}
                            onClick={() => {
                                createPack(props.pack, props.setLoading, setSnackbarOpen, setDownloadLink, props.setPack);
                            }}
                            >
                            <AddIcon sx={{ mr: props.loading ? 0 : 1 }}/>
                            {props.loading ? null : "Create"}
                        </Fab>
                        {props.loading ? 
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: "primary.main",
                                    position: "absolute",
                                    top: -6,
                                    left: -6,
                                    zIndex: 1,
                                }}
                            /> 
                        : null}
                    </Box>

                </Grid>
            </Grid>

            <SnackBarPack downloadLink={downloadLink} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
        </div>
    )
}