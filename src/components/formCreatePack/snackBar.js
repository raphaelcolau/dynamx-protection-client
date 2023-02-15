import * as React from 'react';
import { Snackbar, Button, IconButton, ThemeProvider } from '@mui/material';
import { DynamXTheme } from '../../config/dynamxtheme';
import CloseIcon from '@mui/icons-material/Close';
const { ipcRenderer } = window.require("electron");

export default function SnackBarPack(props) {
    return (
        <Snackbar 
        open={props.snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
            props.setSnackbarOpen(false);
        }}
        message="Package protected successfully"
        sx={{
            position: "absolute",
            bottom: "15vh",
            left: "0",
            right: "0",
            margin: "auto",
            width: "70vw",
            maxWidth: "100%",
        }}
        action={
            <React.Fragment>
                <ThemeProvider theme={DynamXTheme}>
                    <Button color="secondary" size="small" onClick={() => {
                        ipcRenderer.send("browser-url", props.downloadLink);
                        props.setSnackbarOpen(false);
                    }}>
                        Download
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => {
                        props.setSnackbarOpen(false);
                    }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </ThemeProvider>
            </React.Fragment>
        }
    />
    )
}