import * as React from 'react';
import PageComponent from '../components/page/page';
import axios from 'axios';
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import squareLogo from '../assets/images/square-logo.png';
const ipcRenderer = window.require('electron').ipcRenderer;

export default function PagePacks() {
    const [packs, setPacks] = React.useState([]);

    React.useEffect(() => {
        const address = sessionStorage.getItem("apiAddress");
        axios.get(`//${address}/mprotector/packs/list`).then((response) => {
            setPacks(response.data);
        }).catch((error) => {
            console.log(error);
        })
    })

    const pageContainer = {
        width: '90%',
        height: 'calc(100vh - 4.5rem)', // 4.5rem is the height of the bottom navigation bar
        margin: "auto",
        marginTop: "1rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: "1rem",
    };

    const paperStyle = {
        width: '100%',
        height: '16vh',
    }

    return (
        <PageComponent navigation pageNumber={2}>
            <div style={pageContainer}>
                {packs.map((pack) => {
                    return (
                        <Grid container key={pack._id} spacing={2}>
                            <Grid item xs={8}>
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
                                                    <Button variant="text">
                                                        delete
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item xs={4}>
                                <Paper style={paperStyle} elevation={1} >
                                    stats
                                </Paper>
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        </PageComponent>
    );
}