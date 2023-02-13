import { Paper, Input } from '@mui/material';
import * as React from 'react';
import PageComponent from '../components/page/page';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function PageAdd() {
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
    };
    
    return (
        <PageComponent navigation pageNumber={1}>
            <div style={pageContainer}>
                <Paper elevation={3} style={paperStyle}>
                    <DropZone />
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    Input zone
                </Paper>
            </div>
        </PageComponent>
    );
}

function DropZone() {
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

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files[0].type === "application/zip") {
                setError(null);
                setFile(e.dataTransfer.files[0]);
                e.dataTransfer.clearData();
            } else {
                setError("Only .zip and .dnxpack files are allowed");
            }
        }
    };

    const onFileSelect = (e) => {
        setError(null);
        setFile(e.target.files[0]);
    };

    const dropZoneStyle = {
        height: '37vh',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "1rem",
        border: `1px dashed ${error ? '#c62828' : 'rgba(255, 255, 255, 0.6)'}`,
        cursor: 'pointer',
        color: `${error ? '#c62828' : 'rgba(255, 255, 255, 0.6)'}`,
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
            
            <label htmlFor="file-input">
                <input style={inputFileStyle}
                    type="file"
                    onChange={onFileSelect}
                    accept=".dnxpack,.zip"
                    id="file-input"
                />
            </label>
        </div>
    )
}