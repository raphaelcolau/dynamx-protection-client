import * as React from 'react';
import {Button, Grid, Paper, Typography, Avatar} from '@mui/material';
import squareLogo from '../../assets/images/square-logo.png';
import axios from 'axios';
const ipcRenderer = window.require('electron').ipcRenderer;

export default function PackDisplayComponent(props) {
    const paperStyle = props.style;
    const pack = props.pack;

    return (
        <Paper 
            style={paperStyle}
            elevation={1}
        >
            <Grid container sx={{padding: 1}}>
                <Grid item xs={2}>
                    <Avatar sx={{width: 42, height: 42, mt: 0.5}} alt={pack.name} src={squareLogo} />
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography 
                                variant="button"
                                component="div"
                                sx={{mt: 0.5}}
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}    
                            >
                                {pack.name}
                            </Typography>
                            <Typography 
                                variant="caption"
                                component="div"
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {pack.keyw}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <Button variant="text" onClick={() => {
                                const address = sessionStorage.getItem("apiAddress");
                                ipcRenderer.send("browser-url", `//${address}/mprotector/packs/download/${pack.name}`);
                            }}>
                                download
                            </Button>
                            <Button variant="text" onClick={() => {
                                const address = sessionStorage.getItem("apiAddress");
                                axios.post(`//${address}/mprotector/packs/clean`, {
                                    pack_name: pack.name,
                                }).then((response) => {
                                console.log(response);
                            }).catch((error) => {
                                console.log(error);
                            })
                            }}>
                                delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}