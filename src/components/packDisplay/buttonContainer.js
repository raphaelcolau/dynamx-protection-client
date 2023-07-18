import React from 'react';
import axios from 'axios';
import { Grid, Button } from '@mui/material';
const ipcRenderer = window.require('electron').ipcRenderer;

export default function ButtonComponent(props) {
    const pack = props.pack;
    return (
        <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'flex-end',
        }}>
            <Button variant="text" onClick={() => {
                const address = sessionStorage.getItem("apiAddress");
                ipcRenderer.send("browser-url", `https://${address}/mprotector/packs/download/${pack.name}`);
            }}>
                download
            </Button>
            <Button variant="text" onClick={() => {
                const address = sessionStorage.getItem("apiAddress");
                axios.post(`https://${address}/mprotector/packs/clean`, {
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
    )
}