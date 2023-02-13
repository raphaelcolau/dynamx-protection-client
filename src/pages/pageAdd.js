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
        console.log(e.dataTransfer.files[0]);
        setFile(e.dataTransfer.files[0]);
    };

    const onFileSelect = (e) => {
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
        border: '1px dashed rgba(255, 255, 255, 0.6)',
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.6)',
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