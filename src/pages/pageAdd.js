import { Paper, TextField, Grid, Fab, CircularProgress, Snackbar } from '@mui/material';
import * as React from 'react';
import PageComponent from '../components/page/page';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PageAdd() {
    const [pack, setPack] = React.useState({
        rep_id: "",
        game_dir: "",
        pack_file: [],
    });
    const [loading, setLoading] = React.useState(false);

    const pageContainer = {
        width: '100%',
        height: 'calc(100vh - 4.5rem)', // 4.5rem is the height of the bottom navigation bar    
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "1rem",
    };

    const paperStyle = {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    return (
        <PageComponent navigation pageNumber={1}>
            <div style={pageContainer}>

                <Paper elevation={1} style={paperStyle}>
                    <DropZone pack={pack} setPack={setPack} />
                </Paper>

                <Paper elevation={1} style={paperStyle}>
                    <InputZone pack={pack} setPack={setPack} loading={loading} setLoading={setLoading}/>
                </Paper>

            </div>
        </PageComponent>
    );
}

function createPack(pack, setLoading, setSnackbar, setDownloadLink) {
    const apiAddress = sessionStorage.getItem("apiAddress");
    const fileName = pack.pack_file.name;
    const file = new Blob([pack.pack_file], {type: "application/zip"});    

    const formData = new FormData();
    formData.append("pack_file", file, fileName);
    formData.append("rep_id", pack.rep_id);
    formData.append("game_dir", pack.game_dir);
    setLoading(true);


    axios.post(`//${apiAddress}/mprotector/packs/zip`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.data.dl_link) {
            setDownloadLink(response.data.dl_link);
            setSnackbar(true);
        }
        setLoading(false);
    }).catch((error) => {
        console.log(error);
        setLoading(false);
    });
}

function validPack(pack) {
    if (pack.rep_id && pack.rep_id !== "" && pack.rep_id.length > 0) {
        if (pack.pack_file instanceof File && pack.pack_file !== null && pack.pack_file !== undefined && pack.pack_file !== "") {
            return true;
        }
    }
    return false;
}

function InputZone(props) {
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState(null);
    const [helperText, setHelperText] = React.useState(" ");
    const [disabled, setDisabled] = React.useState(validPack(props.pack));
    const [timeoutId, setTimeoutId] = React.useState(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(true);
    const [downloadLink, setDownloadLink] = React.useState(null);

    React.useEffect(() => {
        setDisabled(validPack(props.pack));
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
                                createPack(props.pack, props.setLoading, setSnackbarOpen, setDownloadLink);
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

            <Snackbar 
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                message="Package protected successfully"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => {}}>
                            Download
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => {
                            setSnackbarOpen(false);
                        }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

function DropZone(props) {
    const [dragging, setDragging] = React.useState(false);
    const [file, setFile] = React.useState([]);
    const [error, setError] = React.useState(null);

    const onDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const defineFile = (file) => {
        const address = sessionStorage.getItem("apiAddress");
        if (file && file.name && !file.name !== "" && file.path && !file.path !== "") {
            axios.post(`//${address}/checks/filename`, {
                fileName: file.name,
            })
            .then((response) => {
                if (response.data === "OK") {
                    setFile(file);
                    props.setPack({
                        ...props.pack,
                        pack_file: file,
                    });
                    setError(null);
                } else {
                    setError(response.data);
                    props.setPack({
                        ...props.pack,
                        pack_file: "",
                    })
                    setFile([]);
                }
            })
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files[0].type === "application/zip" || e.dataTransfer.files[0].type === "application/x-zip-compressed" || (e.dataTransfer.files[0].type === "" && e.dataTransfer.files[0].name.endsWith(".dnxpack"))) {
                setError(null);
                defineFile(e.dataTransfer.files[0]);
                e.dataTransfer.clearData();
            } else {
                setError("Only .zip and .dnxpack files are allowed");
            }
        }
    };

    const onFileSelect = (e) => {
        setError(null);
        defineFile(e.target.files[0]);
    };

    const dropZoneStyle = {
        height: '37vh',
        width: '100%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "1rem",
        border: `1px dashed ${error ? '#c62828' : 'rgba(255, 255, 255, 0.6)'}`,
        cursor: 'pointer',
        color: `${error ? '#c62828' : 'rgba(255, 255, 255, 0.6)'}`,
        position: 'relative',
    };

    const inputFileStyle = {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    };

    return (
        <div 
            style={dropZoneStyle}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {error ? <p>{error}</p> : null}
            {dragging ? 
                "Drop here" : 
                `${(file && file.name) ? `${file.name}` : "Drag and drop a file here or click to select a file"}`
            }
            <CloudDownloadIcon sx={{ fontSize: 60 }} />
            
            
            <input style={inputFileStyle}
                type="file"
                onChange={onFileSelect}
                accept=".dnxpack,.zip"
                id="file-input"
            />
        </div>
    )
}