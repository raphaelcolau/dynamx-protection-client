import * as React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';

export default function DropZone(props) {
    const [dragging, setDragging] = React.useState(false);
    const [file, setFile] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setFile(props.pack.pack_file);
    }, [props.pack]);

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
            axios.post(`https://${address}/checks/filename`, {
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